# CI/CD Setup for ngtkana.com

This document explains how to set up Continuous Integration and Continuous Deployment (CI/CD) for the ngtkana.com website using GitHub Actions and Google Cloud Run.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. A GitHub repository for your project
3. Basic familiarity with GitHub Actions and Google Cloud

## Setup Steps

### 1. Google Cloud Setup

#### Create a Google Cloud Project (if you don't have one already)

```bash
gcloud projects create ngtkana-website --name="ngtkana.com"
```

#### Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable iam.googleapis.com
```

#### Create Artifact Registry Repository

```bash
gcloud artifacts repositories create ngtkana-com \
  --repository-format=docker \
  --location=asia-northeast1 \
  --description="Docker repository for ngtkana.com"
```

#### Create Service Account for GitHub Actions

```bash
gcloud iam service-accounts create sa-deployment \
  --display-name="GitHub Actions"
```

#### Grant Necessary Permissions to the Service Account

```bash
# Allow deploying to Cloud Run
gcloud projects add-iam-policy-binding ngtkana-website \
  --member="serviceAccount:sa-deployment@ngtkana-website.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Allow pushing to Artifact Registry
gcloud projects add-iam-policy-binding ngtkana-website \
  --member="serviceAccount:sa-deployment@ngtkana-website.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

# Allow service account to act as service account
gcloud projects add-iam-policy-binding ngtkana-website \
  --member="serviceAccount:sa-deployment@ngtkana-website.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

#### Create and Download Service Account Key

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=sa-deployment@ngtkana-website.iam.gserviceaccount.com
```

### 2. GitHub Repository Setup

#### Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `GCP_PROJECT_ID`: Your Google Cloud project ID
   - `GCP_SA_KEY`: The content of the `key.json` file you downloaded earlier (the entire JSON as a string)

### 3. Configure Domain Mapping

After the first successful deployment to Cloud Run, you'll need to map your custom domain to the Cloud Run service:

```bash
gcloud run domain-mappings create \
  --service=ngtkana-com \
  --domain=ngtkana.com \
  --region=asia-northeast1
```

This will provide you with verification records to add to your DNS configuration. Once verified, your domain will point to your Cloud Run service.

## How It Works

The CI/CD pipeline is configured in the `.github/workflows/deploy.yml` file and does the following:

1. Triggers on pushes to the `main` branch or manually via workflow dispatch
2. Sets up Node.js and installs dependencies
3. Lints and builds the Next.js application
4. Authenticates with Google Cloud
5. Builds and pushes a Docker image to Google Artifact Registry
6. Deploys the image to Google Cloud Run
7. Outputs the deployment URL

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Make sure the `GCP_SA_KEY` secret is correctly formatted and contains the entire JSON file content.
2. **Permission Errors**: Verify that the service account has all the necessary permissions.
3. **Build Failures**: Check the GitHub Actions logs for specific error messages.

### Viewing Logs

You can view the deployment logs in the GitHub Actions tab of your repository or in the Google Cloud Console under Cloud Run > Services > ngtkana-com > Logs.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
