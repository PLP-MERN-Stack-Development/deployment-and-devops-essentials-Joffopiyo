# Rollback & Incident Response Runbook

## Rollback Procedures

### Backend (Render)
**When to rollback**: High error rate, crashed server, bad deployment.

**Method 1: Render Dashboard**
1. Log in to Render.
2. Go to "Events" or "History".
3. Find the last successful deploy.
4. Click "Rollback" or "Redeploy".

**Method 2: GitHub Revert**
1. Revert the bad commit in git:
   ```bash
   git revert <bad-commit-hash>
   git push origin main
   ```
2. This will trigger a new deployment via GitHub Actions.

### Frontend (Vercel)
**When to rollback**: Broken UI, white screen of death, critical bug.

**Method 1: Vercel Dashboard**
1. Log in to Vercel.
2. Go to "Deployments".
3. Click the three dots on a previous successful deployment.
4. Select "Redeploy" or "Promote to Production".

**Method 2: Vercel CLI**
1. List deployments: `vercel list`
2. Rollback (alias): `vercel alias set <deployment-url> <custom-domain>`

## Incident Response

### Severity Levels
- **Sev1 (Critical)**: System down, data loss risk. Immediate action required.
- **Sev2 (Major)**: Core feature broken, workaround available. Fix within 4 hours.
- **Sev3 (Minor)**: Minor bug, cosmetic issue. Fix in next sprint.

### Debugging Steps
1. **Check Status Pages**: Render, Vercel, MongoDB Atlas status.
2. **Check Logs**:
   - **Backend**: Render logs, Sentry issues.
   - **Frontend**: Browser console, Sentry issues.
3. **Database**:
   - Check Atlas connection count.
   - Check for slow queries.

### Database Restore
If data corruption occurs:
1. Log in to MongoDB Atlas.
2. Go to "Backup" -> "Restore".
3. Select a snapshot from before the incident.
4. Restore to a temporary cluster first to verify data, then restore to production.
