# Deployment Runbook — Asankhya Capital

How to host the coming-soon site on AWS at **https://asankhyacapital.com**.

**Architecture:** S3 (private) → CloudFront (CDN + HTTPS) → Route 53 (DNS). TLS via a free
ACM certificate. Domain is **registered at GoDaddy**; we only move its **DNS** to Route 53.

> **Do the steps in order.** Two things matter most:
> 1. The ACM certificate **must** be created in **us-east-1** (N. Virginia) — CloudFront only
>    accepts certificates from that region — even though the S3 bucket lives in `ap-south-1`.
> 2. Repoint the GoDaddy nameservers **early** (Step 4/5); DNS propagation can take a while.

Replace every `<PLACEHOLDER>` with your real value as you go. Suggested bucket name:
`asankhya-capital-site`.

---

## Prerequisites

1. **AWS account** with admin (or equivalent) access.
2. **AWS CLI v2** installed on Windows — https://aws.amazon.com/cli/ — then configure it:
   ```powershell
   aws configure
   # AWS Access Key ID:     <from IAM>
   # AWS Secret Access Key: <from IAM>
   # Default region name:   ap-south-1
   # Default output format:  json
   ```
   Verify:
   ```powershell
   aws sts get-caller-identity
   ```

---

## Step 1 — Create the S3 bucket (private)

```powershell
aws s3api create-bucket --bucket asankhya-capital-site --region ap-south-1 `
  --create-bucket-configuration LocationConstraint=ap-south-1

# Lock it down completely — CloudFront will be the ONLY way in.
aws s3api put-public-access-block --bucket asankhya-capital-site `
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```
(New S3 buckets are encrypted by default with SSE-S3 — nothing extra needed.)

## Step 2 — Upload the site

From the project root:
```powershell
aws s3 sync . s3://asankhya-capital-site `
  --delete --exclude ".git/*" --exclude ".gitignore" --exclude "*.ps1" `
  --exclude "README.md" --exclude "DEPLOY.md" --exclude "LICENSE"
```

## Step 3 — Request the TLS certificate (in us-east-1!)

```powershell
aws acm request-certificate --region us-east-1 `
  --domain-name asankhyacapital.com `
  --subject-alternative-names www.asankhyacapital.com `
  --validation-method DNS
```
Note the returned **CertificateArn** → this is `<CERT_ARN>`. We validate it in Step 6.

## Step 4 — Create the Route 53 hosted zone

```powershell
aws route53 create-hosted-zone --name asankhyacapital.com --caller-reference asankhya-2026-07-20
```
From the output, note:
- **Hosted zone ID** → `<HOSTED_ZONE_ID>`
- The **4 nameservers** under `DelegationSet.NameServers` (e.g. `ns-123.awsdns-45.com`, …)

## Step 5 — Repoint GoDaddy nameservers

In **GoDaddy → My Products → Domain (asankhyacapital.com) → Manage DNS → Nameservers**:
- Choose **"I'll use my own nameservers"** (change / enter custom nameservers).
- Enter the **4 Route 53 nameservers** from Step 4.
- Save.

> This does **not** affect your domain registration — it stays at GoDaddy. Propagation is
> usually under an hour but can take up to 48h. Check with:
> `nslookup -type=NS asankhyacapital.com` — once it returns the AWS `awsdns` nameservers, DNS is live.

## Step 6 — Validate the certificate (easiest in the console)

1. AWS Console → **Certificate Manager** → **switch region to N. Virginia (us-east-1)**.
2. Open the pending certificate → **"Create records in Route 53"** → confirm.
   (This auto-adds the validation CNAME records into your hosted zone.)
3. Wait until status shows **Issued** (a few minutes after DNS from Step 5 is live).

## Step 7 — Create the CloudFront distribution (console)

AWS Console → **CloudFront** → **Create distribution**:

| Setting | Value |
|---------|-------|
| Origin domain | select the S3 bucket `asankhya-capital-site` |
| Origin access | **Origin access control (OAC)** → create control setting → **Copy policy** when prompted (used in Step 8) |
| Viewer protocol policy | **Redirect HTTP to HTTPS** |
| Compress objects automatically | **Yes** |
| Alternate domain names (CNAMEs) | `asankhyacapital.com` and `www.asankhyacapital.com` |
| Custom SSL certificate | select `<CERT_ARN>` (the ACM cert) |
| Security policy (min TLS) | TLSv1.2_2021 |
| Default root object | `index.html` |
| Response headers policy | attach **SecurityHeadersPolicy** (AWS managed) |

After creating, add **custom error responses** (Distribution → Error pages → Create):
- HTTP error code **403** → Response page path `/404.html`, HTTP Response code **404**
- HTTP error code **404** → Response page path `/404.html`, HTTP Response code **404**

Note the distribution's **ID** → `<DISTRIBUTION_ID>` and **domain name**
(e.g. `d1234abcd.cloudfront.net`) → `<DISTRIBUTION_DOMAIN>`.

## Step 8 — Grant CloudFront access to the bucket

Paste the policy CloudFront generated in Step 7 into the bucket
(**S3 → bucket → Permissions → Bucket policy → Edit**). It looks like this:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowCloudFrontServicePrincipalReadOnly",
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::asankhya-capital-site/*",
    "Condition": {
      "StringEquals": { "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>" }
    }
  }]
}
```

## Step 9 — Point the domain at CloudFront (Route 53)

Console → **Route 53 → Hosted zone → Create record**, twice:

- **Record 1:** name = *(blank / apex)*, type **A**, **Alias = Yes**, route to
  **CloudFront distribution** → pick `<DISTRIBUTION_DOMAIN>`.
- **Record 2:** name = `www`, type **A**, **Alias = Yes**, same CloudFront target.

(Optionally repeat both as type **AAAA** for IPv6 — recommended.)

<details>
<summary>CLI alternative for Step 9</summary>

```powershell
# CloudFront's fixed alias hosted-zone ID is always Z2FDTNDATAQYW2
aws route53 change-resource-record-sets --hosted-zone-id <HOSTED_ZONE_ID> --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"asankhyacapital.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<DISTRIBUTION_DOMAIN>","EvaluateTargetHealth":false}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.asankhyacapital.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<DISTRIBUTION_DOMAIN>","EvaluateTargetHealth":false}}}
  ]
}'
```
</details>

## Step 10 — Verify

- [ ] `https://asankhyacapital.com` loads the page.
- [ ] `https://www.asankhyacapital.com` loads the page.
- [ ] `http://asankhyacapital.com` redirects to `https://`.
- [ ] Browser shows a valid padlock (no cert warning).
- [ ] Visiting a bad path (e.g. `/nope`) shows the branded 404.
- [ ] The direct S3 URL is **not** publicly accessible (returns AccessDenied) — bucket is locked.

---

## Updating the site later

After all of the above is done once, publishing changes is a single command:
```powershell
./deploy.ps1 -Bucket asankhya-capital-site -DistributionId <DISTRIBUTION_ID>
```
It syncs to S3 and invalidates the CloudFront cache so changes appear within seconds.

---

## Cost (steady state)
- Route 53 hosted zone: **$0.50/mo** + negligible query charges
- S3 storage (a few MB): **pennies**
- CloudFront: within the free tier (1 TB out + 10M requests/mo) → **effectively $0**
- ACM certificate: **free**, auto-renews
- **≈ $0.50–$1.00 / month total**

---

## Troubleshooting
- **Cert stuck "Pending validation":** DNS from Step 5 isn't live yet, or the validation CNAME
  wasn't added. Confirm `nslookup -type=NS asankhyacapital.com` returns AWS nameservers.
- **403 / AccessDenied in the browser:** the bucket policy (Step 8) isn't applied, or the OAC
  isn't attached to the origin.
- **CNAMEAlreadyExists error in CloudFront:** the domain is already an alternate name on another
  distribution — remove it there first.
- **Changes not showing:** CloudFront cached the old file — run `deploy.ps1` (it invalidates), or
  `aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"`.
