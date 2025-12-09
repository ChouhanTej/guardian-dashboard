#!/bin/bash

# Guardian Dashboard - Start Backend Only
# Use this after initial setup

set -e

echo ""
echo "🚀 Starting Guardian Dashboard Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd backend

if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install --legacy-peer-deps
fi

echo "✅ Starting backend on http://localhost:5000"
echo "   WebSocket: ws://localhost:5000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
