<#
.SYNOPSIS
    One-time setup: attaches the clean-URL CloudFront Function to the
    site's distribution so /about serves about.html and /about.html
    301-redirects to /about.

.DESCRIPTION
    Creates (or updates) the CloudFront Function from
    infra/clean-urls-function.js, validates it against sample events on
    the DEVELOPMENT stage, publishes it, and associates it with the
    distribution's default cache behavior as a viewer-request function.

    Run this BEFORE deploying the site build whose internal links are
    extensionless. Attaching it while the old site is live is harmless.
    Requires AWS CLI v2 with the same credentials deploy.ps1 uses.

.PARAMETER DistributionId
    The CloudFront distribution ID (e.g. E1234567890ABC).

.PARAMETER FunctionName
    Name for the CloudFront Function. Default: asankhya-clean-urls.

.EXAMPLE
    ./setup-clean-urls.ps1 -DistributionId E1234567890ABC
#>

param(
    [Parameter(Mandatory = $true)] [string] $DistributionId,
    [string] $FunctionName = "asankhya-clean-urls"
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

$codePath = Join-Path $PSScriptRoot "infra\clean-urls-function.js"
if (-not (Test-Path $codePath)) { throw "infra/clean-urls-function.js not found." }

Write-Host "==> Verifying AWS CLI credentials..." -ForegroundColor Cyan
aws sts get-caller-identity | Out-Null

# ---- Create or update the function ---------------------------------------
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = "Continue"
aws cloudfront describe-function --name $FunctionName 2>$null | Out-Null
$exists = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $prevEAP

if (-not $exists) {
    Write-Host "==> Creating CloudFront Function '$FunctionName'..." -ForegroundColor Cyan
    aws cloudfront create-function --name $FunctionName `
        --function-config "Comment=Clean URLs: extensionless paths serve .html; .html URLs 301 to clean,Runtime=cloudfront-js-2.0" `
        --function-code "fileb://infra/clean-urls-function.js" | Out-Null
} else {
    Write-Host "==> Function exists; updating code..." -ForegroundColor Cyan
    $etag = (aws cloudfront describe-function --name $FunctionName | ConvertFrom-Json).ETag
    aws cloudfront update-function --name $FunctionName --if-match $etag `
        --function-config "Comment=Clean URLs: extensionless paths serve .html; .html URLs 301 to clean,Runtime=cloudfront-js-2.0" `
        --function-code "fileb://infra/clean-urls-function.js" | Out-Null
}

$desc = aws cloudfront describe-function --name $FunctionName | ConvertFrom-Json
$etag = $desc.ETag
$arn  = $desc.FunctionSummary.FunctionMetadata.FunctionARN

# ---- Test on the DEVELOPMENT stage before publishing ---------------------
Write-Host "==> Testing function against sample events..." -ForegroundColor Cyan
$tmpDir = Join-Path $env:TEMP "cf-fn-tests"
New-Item -ItemType Directory -Force $tmpDir | Out-Null

function Invoke-CfTest {
    param([string]$Uri)
    $event = @{
        version = "1.0"
        context = @{ eventType = "viewer-request" }
        viewer  = @{ ip = "1.2.3.4" }
        request = @{ method = "GET"; uri = $Uri; headers = @{}; cookies = @{}; querystring = @{} }
    } | ConvertTo-Json -Depth 8
    $eventPath = Join-Path $tmpDir "event.json"
    [System.IO.File]::WriteAllText($eventPath, $event, (New-Object System.Text.UTF8Encoding($false)))
    $result = aws cloudfront test-function --name $FunctionName --if-match $etag `
        --stage DEVELOPMENT --event-object "fileb://$eventPath" | ConvertFrom-Json
    if ($result.TestResult.FunctionErrorMessage) {
        throw "Function error for '$Uri': $($result.TestResult.FunctionErrorMessage)"
    }
    return $result.TestResult.FunctionOutput | ConvertFrom-Json
}

$failures = @()

$out = Invoke-CfTest "/about"
if ($out.request.uri -ne "/about.html") { $failures += "/about should rewrite to /about.html, got: $($out | ConvertTo-Json -Compress)" }

$out = Invoke-CfTest "/about.html"
if (-not ($out.response.statusCode -eq 301 -and $out.response.headers.location.value -eq "/about")) { $failures += "/about.html should 301 to /about, got: $($out | ConvertTo-Json -Compress)" }

$out = Invoke-CfTest "/index.html"
if (-not ($out.response.statusCode -eq 301 -and $out.response.headers.location.value -eq "/")) { $failures += "/index.html should 301 to /, got: $($out | ConvertTo-Json -Compress)" }

$out = Invoke-CfTest "/assets/main-abc123.js"
if ($out.request.uri -ne "/assets/main-abc123.js") { $failures += "/assets/*.js should pass through, got: $($out | ConvertTo-Json -Compress)" }

$out = Invoke-CfTest "/"
if ($out.request.uri -ne "/") { $failures += "/ should pass through, got: $($out | ConvertTo-Json -Compress)" }

$out = Invoke-CfTest "/team/"
if ($out.request.uri -ne "/team.html") { $failures += "/team/ should rewrite to /team.html, got: $($out | ConvertTo-Json -Compress)" }

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Host "    FAIL: $_" -ForegroundColor Red }
    throw "Function tests failed - nothing published, distribution untouched."
}
Write-Host "    All 6 test events passed." -ForegroundColor Green

# ---- Publish -------------------------------------------------------------
Write-Host "==> Publishing function..." -ForegroundColor Cyan
aws cloudfront publish-function --name $FunctionName --if-match $etag | Out-Null

# ---- Associate with the distribution's default behavior ------------------
Write-Host "==> Attaching to distribution $DistributionId..." -ForegroundColor Cyan
$cfgResp  = aws cloudfront get-distribution-config --id $DistributionId | ConvertFrom-Json
$distEtag = $cfgResp.ETag
$cfg      = $cfgResp.DistributionConfig
$existing = $cfg.DefaultCacheBehavior.FunctionAssociations

if ($existing.Quantity -gt 0) {
    $ours   = $existing.Items | Where-Object { $_.FunctionARN -eq $arn }
    $others = $existing.Items | Where-Object { $_.FunctionARN -ne $arn }
    if ($others) {
        throw "Distribution already has other function associations - review manually before attaching: $($others | ConvertTo-Json -Compress)"
    }
    if ($ours) {
        Write-Host "    Function already attached; nothing to do." -ForegroundColor Yellow
        Write-Host "==> Done." -ForegroundColor Green
        exit 0
    }
}

$cfg.DefaultCacheBehavior.FunctionAssociations = [PSCustomObject]@{
    Quantity = 1
    Items    = @([PSCustomObject]@{ FunctionARN = $arn; EventType = "viewer-request" })
}

$cfgPath = Join-Path $tmpDir "dist-config.json"
[System.IO.File]::WriteAllText($cfgPath, ($cfg | ConvertTo-Json -Depth 32), (New-Object System.Text.UTF8Encoding($false)))
aws cloudfront update-distribution --id $DistributionId --if-match $distEtag `
    --distribution-config "file://$cfgPath" | Out-Null

Write-Host "==> Done. The distribution is deploying the change (takes a few minutes)." -ForegroundColor Green
Write-Host ""
Write-Host "Verify once deployed (and after the next site deploy):" -ForegroundColor Cyan
Write-Host "    curl -sI https://asankhyacapital.com/about        # 200, HTML"
Write-Host "    curl -sI https://asankhyacapital.com/about.html   # 301 -> /about"
Write-Host "    curl -sI https://asankhyacapital.com/index.html   # 301 -> /"
Write-Host "    curl -sI https://asankhyacapital.com/nonexistent  # 404 page"
