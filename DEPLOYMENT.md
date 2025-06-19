# Deployment Guide

This guide will help you deploy your Create Any Doc application to Fly.io.

## Prerequisites

1. Install Fly.io CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Login to Fly.io:
   ```bash
   flyctl auth login
   ```

3. Make sure you have the following environment variables set up:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `DATABASE_URL` - Your PostgreSQL database URL

## Quick Deployment

### Option 1: Use the deployment script
```bash
./deploy.sh
```

### Option 2: Manual deployment
```bash
# Create volume for data persistence
flyctl volumes create create_any_doc_data --size 1 --region bom

# Deploy the application
flyctl deploy --remote-only
```

## Environment Variables

Set your environment variables in Fly.io:

```bash
# Set OpenAI API key
flyctl secrets set OPENAI_API_KEY="your-openai-api-key"

# Set database URL (if using external database)
flyctl secrets set DATABASE_URL="your-database-url"
```

## Database Setup

### Option 1: Use Fly.io PostgreSQL (Recommended)
```bash
# Create a PostgreSQL database
flyctl postgres create --name create-any-doc-db --region bom

# Attach it to your app
flyctl postgres attach create-any-doc-db --app create-any-doc
```

### Option 2: Use external database
Set the `DATABASE_URL` secret with your external PostgreSQL connection string.

## Running Database Migrations

After deployment, run the database migrations:

```bash
# Connect to your app and run migrations
flyctl ssh console -C "npx prisma migrate deploy"
```

## Monitoring

- View logs: `flyctl logs`
- Check app status: `flyctl status`
- Open app: `flyctl open`

## Troubleshooting

### Common Issues

1. **Build fails with "prisma not found"**
   - Make sure the Dockerfile is in the root directory
   - Check that the backend directory structure is correct

2. **Database connection issues**
   - Verify your `DATABASE_URL` is correct
   - Check if the database is accessible from Fly.io

3. **CORS errors**
   - The backend is configured to allow requests from:
     - `http://localhost:3000`
     - `https://create-any-doc.fly.dev`
     - `https://create-any-doc-frontend.fly.dev`

### Useful Commands

```bash
# View app logs
flyctl logs

# SSH into the app
flyctl ssh console

# Scale the app
flyctl scale count 1

# Check app status
flyctl status

# Destroy the app (if needed)
flyctl apps destroy create-any-doc
```

## Frontend Deployment (Optional)

If you want to deploy the frontend separately:

1. Create a new Fly.io app for the frontend
2. Use the `frontend/Dockerfile`
3. Update the API URL in the frontend to point to your backend

## Cost Optimization

- The app is configured to auto-stop when not in use
- Uses shared CPU for cost efficiency
- 512MB memory allocation
- Auto-scaling based on demand

## Security

- HTTPS is enforced
- Non-root user in container
- Security headers configured
- CORS properly configured 