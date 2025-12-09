@echo off
REM Guardian Dashboard - Setup Script for Windows
REM This script sets up both frontend and backend

setlocal enabledelayedexpansion

echo.
echo 🚀 Guardian Dashboard Setup
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo ✅ Created .env file from template
) else (
    echo ✅ .env file already exists
)

cd ..
echo ✅ Backend setup complete
echo.

REM Setup Frontend
echo 📦 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env.local" (
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000
        echo NEXT_PUBLIC_WS_URL=http://localhost:5000
    ) > .env.local
    echo ✅ Created .env.local file
) else (
    echo ✅ .env.local file already exists
)

cd ..
echo ✅ Frontend setup complete
echo.

echo 🎉 Setup Complete!
echo.
echo Next steps:
echo 1. Terminal 1 - Start Backend:
echo    cd backend ^&^& npm run dev
echo.
echo 2. Terminal 2 - Start Frontend:
echo    cd frontend ^&^& npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
pause
