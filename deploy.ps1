<#
.SYNOPSIS
    Deploys the Asankhya Capital coming-soon site to AWS (S3 + CloudFront).

.DESCRIPTION
    Syncs the static site to the S3 bucket, then invalidates the CloudFront cache
    so changes go live immediately. Requires AWS CLI v2 configured (`aws configure`).

.PARAMETER Bucket
    The S3 bucket name (e.g. asankhya-capital-site).

.PARAMETER DistributionId
    The CloudFront distribution ID (e.g. E1234567890ABC).

.EXAMPLE
    ./deploy.ps1 -Bucket asankhya-capital-site -DistributionId E1234567890ABC
#>

param(
    [Parameter(Mandatory = $true)] [string] $Bucket,
    [Parameter(Mandatory = $true)] [string] $DistributionId
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "==> Verifying AWS CLI credentials..." -ForegroundColor Cyan
aws sts get-caller-identity | Out-Null

Write-Host "==> Syncing site to s3://$Bucket ..." -ForegroundColor Cyan
# Only upload site assets; never upload docs, scripts, git, or config.
aws s3 sync . "s3://$Bucket" `
    --delete `
    --exclude ".git/*" `
    --exclude ".gitignore" `
    --exclude "*.ps1" `
    --exclude "README.md" `
    --exclude "DEPLOY.md" `
    --exclude "LICENSE"

# Long cache for versioned/static assets, short cache for HTML so updates show fast.
Write-Host "==> Setting cache headers on HTML..." -ForegroundColor Cyan
aws s3 cp "index.html" "s3://$Bucket/index.html" --cache-control "public, max-age=300" --content-type "text/html"
aws s3 cp "404.html"   "s3://$Bucket/404.html"   --cache-control "public, max-age=300" --content-type "text/html"

Write-Host "==> Invalidating CloudFront cache..." -ForegroundColor Cyan
$invalidation = aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*" | ConvertFrom-Json
Write-Host ("    Invalidation ID: {0}" -f $invalidation.Invalidation.Id)

Write-Host "==> Done. Live at https://asankhyacapital.com/" -ForegroundColor Green
