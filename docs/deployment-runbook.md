# Deployment Runbook

## Overview
This document outlines the procedures for deploying the MERN application to production.

## Prerequisites
- Access to GitHub Repository
- Access to Render Dashboard (Backend)
- Access to Vercel Dashboard (Frontend)
- Access to MongoDB Atlas

## Automated Deployment
The primary deployment method is via GitHub Actions.

### Backend (Render)
1. **Trigger**: Push to `main` branch.
2. **Action**: `backend-cd.yml` workflow runs.
3. **Verification**:
   - Check GitHub Actions tab for success.
   - Check Render dashboard for deployment status.
   - Verify health endpoint: `curl https://<your-backend-url>/health`

### Frontend (Vercel)
1. **Trigger**: Push to `main` branch.
2. **Action**: `frontend-cd.yml` workflow runs.
3. **Verification**:
   - Check GitHub Actions tab for success.
   - Check Vercel dashboard for deployment status.
   - Verify frontend URL: `https://<your-frontend-url>`

## Manual Deployment

### Backend (Render)
If GitHub Actions fails, you can trigger a deploy manually via Render:
1. Log in to Render.
2. Go to the service dashboard.
3. Click "Manual Deploy" -> "Deploy latest commit".
4. **API Method**:
   ```bash
   curl -X POST https://api.render.com/v1/services/<SERVICE_ID>/deploys \
     -H "Authorization: Bearer <API_KEY>"
   ```

### Frontend (Vercel)
If GitHub Actions fails, you can deploy via Vercel CLI locally:
1. Install Vercel CLI: `npm i -g vercel`
2. Run deploy command:
   ```bash
   cd frontend
   vercel --prod
   ```

## Secrets Management
- **GitHub Secrets**: Store in Settings -> Secrets and variables -> Actions.
- **Render Environment**: Store in Service Settings -> Environment.
- **Vercel Environment**: Store in Project Settings -> Environment Variables.

Required Secrets:
- `MONGODB_URI`
- `JWT_SECRET`
- `SENTRY_DSN`
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`
- `VERCEL_TOKEN`
