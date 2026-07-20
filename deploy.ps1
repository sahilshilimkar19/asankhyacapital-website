<#
.SYNOPSIS
    Builds and deploys the Asankhya Capital site to AWS (S3 + CloudFront).

.DESCRIPTION
    Runs the Vite production build, syncs dist/ to the S3 bucket with tiered
    cache headers (short for HTML, immutable for hashed assets and fonts), and
    invalidates the CloudFront cache. Requires AWS CLI v2 (`aws configure`)
    and Node.js >= 20.19.

.PARAMETER Bucket
    The S3 bucket name (e.g. asankhya-capital-site).

.PARAMETER DistributionId
    The CloudFront distribution ID (e.g. E1234567890ABC). Optional — omit for
    the first upload, before the distribution exists.

.PARAMETER SkipBuild
    Skip `npm run build` and deploy the existing dist/ as-is.

.EXAMPLE
    ./deploy.ps1 -Bucket asankhya-capital-site -DistributionId E1234567890ABC
#>

param(
    [Parameter(Mandatory = $true)] [string] $Bucket,
    [Parameter(Mandatory = $false)] [string] $DistributionId,
    [switch] $SkipBuild
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "==> Verifying AWS CLI credentials..." -ForegroundColor Cyan
aws sts get-caller-identity | Out-Null

if (-not $SkipBuild) {
    Write-Host "==> Building (npm run build)..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build failed — aborting deploy." }
}

if (-not (Test-Path "$PSScriptRoot\dist\index.html")) {
    throw "dist/index.html not found — run the build first."
}

Write-Host "==> Syncing dist/ to s3://$Bucket ..." -ForegroundColor Cyan
# Whole tree gets a short cache and --delete cleans up stale hashed bundles.
aws s3 sync dist "s3://$Bucket" --delete --cache-control "public, max-age=300"

Write-Host "==> Stamping immutable cache on hashed assets..." -ForegroundColor Cyan
if (Test-Path "$PSScriptRoot\dist\assets") {
    aws s3 cp "dist/assets" "s3://$Bucket/assets" --recursive `
        --cache-control "public, max-age=31536000, immutable"
}

Write-Host "==> Stamping immutable cache on fonts..." -ForegroundColor Cyan
if (Test-Path "$PSScriptRoot\dist\fonts") {
    # Explicit content-type: Windows mimetype registry may not know .woff2.
    aws s3 cp "dist/fonts" "s3://$Bucket/fonts" --recursive `
        --cache-control "public, max-age=31536000, immutable" `
        --content-type "font/woff2"
}

if ($DistributionId) {
    Write-Host "==> Invalidating CloudFront cache..." -ForegroundColor Cyan
    $invalidation = aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*" | ConvertFrom-Json
    Write-Host ("    Invalidation ID: {0}" -f $invalidation.Invalidation.Id)
} else {
    Write-Host "==> No -DistributionId given; skipping CloudFront invalidation." -ForegroundColor Yellow
}

Write-Host "==> Done." -ForegroundColor Green
