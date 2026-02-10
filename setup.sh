#!/bin/bash
# PRASHANT Quick Start Script

echo "🚀 Welcome to PRASHANT - Daily Activity Tracker"
echo "================================================"
echo ""

# Check Node.js
echo "✅ Checking Node.js installation..."
node -v
echo ""

# Check MongoDB
echo "ℹ️  MongoDB Check:"
echo "Make sure MongoDB is running on your system"
echo ""

# Install root packages
echo "📦 Installing root dependencies..."
npm install -g concurrently --save-dev
npm install concurrently --save-dev
echo ""

# Navigate and install dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo ""

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo ""

echo "✨ Setup complete!"
echo ""
echo "To start the app, run:"
echo "  npm start"
echo ""
echo "Or run in development mode:"
echo "  npm run dev"
echo ""
echo "Frontend will open at: http://localhost:3000"
echo "Backend API at: http://localhost:5000"
echo ""
echo "Happy coding! 🎉"
