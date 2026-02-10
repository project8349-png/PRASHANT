# PRASHANT Mobile - GitHub Actions APK Build Guide

## Automatic APK Building

Your PRASHANT app can be built as an APK automatically! Here's how:

### Option 1: Using Expo's EAS (Easiest) ⭐

**Steps:**

1. **Create Expo Account** (Free)
   - Go to: https://expo.dev
   - Sign up with GitHub

2. **Create EAS Token**
   - Go to: https://expo.dev/accounts/YOUR_USERNAME/settings/tokens
   - Create new token
   - Copy it

3. **Add to GitHub Secrets**
   - Go to: https://github.com/project8349-png/PRASHANT/settings/secrets/actions
   - Click "New repository secret"
   - Name: `EAS_TOKEN`
   - Value: Paste your EAS token

4. **Trigger Build**
   - Push code to GitHub
   - Go to "Actions" tab
   - Watch the build process
   - Download APK from artifacts

**Command to build locally:**
```bash
cd mobile
npm install -g eas-cli
eas login
eas build --platform android
```

---

### Option 2: GitHub Actions Workflow

The workflow files are already set up:
- `.github/workflows/build-apk.yml` - Main build workflow
- `.github/workflows/apk-build.yml` - Setup instructions

**Just push to GitHub and the build starts automatically!**

---

### Option 3: Manual Local Build

```bash
cd mobile
npm install
npx expo prebuild --clean
cd android
./gradlew assembleRelease
```

The APK will be at: `mobile/android/app/build/outputs/apk/release/app-release.apk`

---

## Download APK from GitHub

1. Go to: https://github.com/project8349-png/PRASHANT
2. Click **"Actions"** tab
3. Select the latest build
4. Download **"prashant-app-apk"** artifact
5. Transfer APK to your Android phone
6. Install it!

---

## What's Included in Mobile App

- ✅ Login/Signup
- ✅ Daily Activity Tracking
- ✅ Friends List
- ✅ Beautiful UI
- ✅ Connect to backend API

---

## Next Steps to Enable Auto-Build

### If using EAS (Recommended):

1. Create Expo account: https://expo.dev
2. Get EAS token
3. Add `EAS_TOKEN` to GitHub Secrets
4. Push code
5. APK builds automatically!

### Without EAS:

The basic build workflow is already configured. You can:
- Test with Expo Go app
- Build locally with `eas build` (requires token)
- Use Android Studio for professional builds

---

## Mobile App Features Implemented

### Login Screen
- Email login
- Password authentication
- JWT token support

### Activity Tracker
- Log study hours
- Log sleep hours
- Add study notes
- Real-time sync with backend

### Friends Screen
- View friend list
- See online status
- Chat button
- Real-time updates

### Navigation
- Bottom tab navigation
- Logout button
- Easy switching between screens

---

## Technologies Used

- React Native
- Expo
- React Navigation
- Axios for API calls
- Socket.io for real-time updates

---

## APK File Specifications

| Property | Value |
|----------|-------|
| App Name | PRASHANT |
| Package | com.prashant.app |
| Version | 1.0.0 |
| Min SDK | 21 |
| Target SDK | 33 |
| File Size | ~50-100 MB (estimated) |

---

## Installation on Android Phone

1. Download APK from GitHub Actions
2. Transfer to phone (email, drive, etc.)
3. Open file manager
4. Tap the APK file
5. Allow installation from unknown sources
6. Install
7. Open and login!

---

## Testing & Debugging

### Using Expo Go (Best for Testing)

```bash
cd mobile
npm install -g expo-cli
npx expo start
```

Scan QR code with Expo Go app from Play Store.

### Using Android Emulator

```bash
npx expo start --android
```

Requires Android Studio and emulator setup.

---

## Current Limitations (Free Tier)

- EAS free tier: 30 mins of build time/month
- Expo Go: Good for testing, not production distribution
- For Play Store: Needs professional signature setup

---

## Next Phase

To fully complete mobile app:
1. Add chat screen with real-time messaging
2. Add notes sharing
3. Add reports/analytics screen
4. Configure Play Store release
5. Set up app signing

---

**Your PRASHANT mobile app is ready to download and install! 🚀**

Check GitHub Actions to see build status and download APK!
