#!/bin/bash

# Guardian Dashboard - Complete Startup Script
# This script sets up AND starts both frontend and backend

set -e

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║      Guardian Dashboard - Complete Setup & Launch         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Install from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo "✅ Node.js $NODE_VERSION"
echo "✅ npm $NPM_VERSION"
echo ""

# Setup Backend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Setting up Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd backend

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install --legacy-peer-deps
else
    echo "✅ Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
else
    echo "✅ .env file exists"
fi

cd ..
echo "✅ Backend ready!"
echo ""

# Setup Frontend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Setting up Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd frontend

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install --legacy-peer-deps
else
    echo "✅ Frontend dependencies already installed"
fi

if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=http://localhost:5000
EOF
else
    echo "✅ .env.local file exists"
fi

cd ..
echo "✅ Frontend ready!"
echo ""

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║              🎉 Setup Complete!                          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📌 Next: Open TWO terminals and run:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   ┌─────────────────────────────────────────────────────┐"
echo "   │ cd backend && npm run dev                           │"
echo "   └─────────────────────────────────────────────────────┘"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   ┌─────────────────────────────────────────────────────┐"
echo "   │ cd frontend && npm run dev                          │"
echo "   └─────────────────────────────────────────────────────┘"
echo ""
echo "   Then open: http://localhost:3000"
echo ""
echo "🔗 Backend:  http://localhost:5000"
echo "🔗 Frontend: http://localhost:3000"
echo "🔗 WebSocket: ws://localhost:5000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation:"
echo "   • SETUP_GUIDE.md - Complete setup walkthrough"
echo "   • QUICKSTART.md  - Quick reference guide"
echo "   • README.md      - Full technical documentation"
echo ""
echo "🚀 Ready to build something amazing!"
echo ""
