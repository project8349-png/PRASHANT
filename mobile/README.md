# PRASHANT Mobile App (React Native with Expo)

This is the mobile version of the PRASHANT Daily Activity Tracker app.

## Features

- Login & Authentication
- Daily Activity Tracking
- Friends Management
- Real-time Updates

## Setup

```bash
cd mobile
npm install
npx expo start
```

## Build APK

### Method 1: Using EAS (Easiest)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --local
```

### Method 2: Using GitHub Actions (Automated)

The APK is built automatically on each push via GitHub Actions!

Check the "Actions" tab on GitHub to download the APK.

## Running on Device

Download the Expo Go app from Google Play Store and scan the QR code from `npx expo start`.

## Technologies

- React Native
- Expo
- React Navigation
- Axios
- Socket.io Client

## API Base URL

Update `http://localhost:5000` to your actual backend URL in the code.
