@echo off
REM PRASHANT APK Builder Script for Windows

echo.
echo 🚀 PRASHANT Mobile App - APK Builder
echo ====================================
echo.

REM Check if in mobile directory
if not exist "package.json" (
    echo ❌ Error: Please run this from the mobile directory
    echo    cd mobile
    echo    build-apk.bat
    exit /b 1
)

echo 📦 Step 1: Installing dependencies...
call npm install

echo.
echo 🔨 Step 2: Installing Expo CLI...
call npm install -g expo-cli

echo.
echo 📝 Step 3: Prebuild for Android...
call npx expo prebuild --clean --platform android

echo.
echo 🏗️  Step 4: Building APK...
cd android

REM Check if gradlew exists
if not exist "gradlew.bat" (
    echo ❌ Error: Android setup not found. Try:
    echo    npm install -g eas-cli
    echo    eas build --platform android
    exit /b 1
)

REM Build the APK
call gradlew.bat assembleRelease

echo.
echo ✅ APK Build Complete!
echo.
echo 📱 APK Location:
echo    .\app\build\outputs\apk\release\app-release.apk
echo.
echo 📲 Installation:
echo    Transfer APK to your phone and install!
echo.
pause
