#!/bin/bash

# Guardian Dashboard - Start Frontend Only
# Use this after initial setup

set -e

echo ""
echo "🎨 Starting Guardian Dashboard Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install --legacy-peer-deps
fi

echo "✅ Starting frontend on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
