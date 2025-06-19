#!/bin/bash

# Deploy to Fly.io
echo "🚀 Deploying to Fly.io..."

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl is not installed. Please install it first:"
    echo "curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# Check if user is logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "❌ Not logged in to Fly.io. Please run: flyctl auth login"
    exit 1
fi

# Create volume if it doesn't exist
echo "📦 Creating volume if needed..."
flyctl volumes create create_any_doc_data --size 1 --region bom || true

# Deploy the application
echo "🚀 Deploying application..."
flyctl deploy --remote-only

echo "✅ Deployment completed!"
echo "🌐 Your app should be available at: https://create-any-doc.fly.dev" 