@echo off
REM PRASHANT Quick Start Script for Windows

echo.
echo 🚀 Welcome to PRASHANT - Daily Activity Tracker
echo ================================================
echo.

REM Check Node.js
echo ✅ Checking Node.js installation...
node -v
echo.

REM Check MongoDB
echo ℹ️  MongoDB Check:
echo Make sure MongoDB is running on your system
echo.

REM Install root packages
echo 📦 Installing root dependencies...
npm install --save-dev concurrently
echo.

REM Navigate and install dependencies
echo 📦 Installing backend dependencies...
cd backend
npm install
cd ..
echo.

echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..
echo.

echo ✨ Setup complete!
echo.
echo To start the app, run:
echo   npm start
echo.
echo Or run in development mode:
echo   npm run dev
echo.
echo Frontend will open at: http://localhost:3000
echo Backend API at: http://localhost:5000
echo.
echo Happy coding! 🎉
echo.
pause
