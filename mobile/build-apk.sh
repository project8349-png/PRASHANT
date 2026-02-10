#!/bin/bash
# PRASHANT APK Builder Script
# This script will build a real APK for Android

echo "🚀 PRASHANT Mobile App - APK Builder"
echo "===================================="
echo ""

# Check if in mobile directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this from the mobile directory"
    echo "   cd mobile"
    echo "   bash build-apk.sh"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔨 Step 2: Installing Expo CLI..."
npm install -g expo-cli

echo ""
echo "📝 Step 3: Prebuild for Android..."
npx expo prebuild --clean --platform android

echo ""
echo "🏗️  Step 4: Building APK..."
cd android

# Check if gradlew exists
if [ ! -f "gradlew" ]; then
    echo "❌ Error: gradlew not found. Please ensure Android setup is complete."
    exit 1
fi

# Build the APK
./gradlew assembleRelease

echo ""
echo "✅ APK Build Complete!"
echo ""
echo "📱 APK Location:"
echo "   ./app/build/outputs/apk/release/app-release.apk"
echo ""
echo "📲 Installation:"
echo "   Transfer APK to your phone and install!"
echo ""
