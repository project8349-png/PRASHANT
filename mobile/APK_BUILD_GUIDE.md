# PRASHANT APK Build - Alternative Methods Guide

## APK Build Status

The GitHub Actions workflow is configured, but requires proper setup for real APK generation.

Here are **3 proven methods to get your APK:**

---

## Method 1: Quick Build with EAS (Recommended) ⭐

**Easiest way - takes 10 minutes!**

```bash
# Step 1: Install EAS
npm install -g eas-cli

# Step 2: Login to Expo
eas login

# Step 3: Build APK
cd mobile
eas build --platform android
```

The APK will be ready in 5-10 minutes. Download from EAS dashboard!

**Benefits:**
- ✅ Signed and ready for Play Store
- ✅ Fast builds
- ✅ Automatic updates
- ✅ Free account available

---

## Method 2: Local Build with Gradle (Advanced)

**If you have Android SDK installed:**

```bash
cd mobile

# Install dependencies
npm install

# Prebuild for Android
npx expo prebuild --clean --platform android

# Build APK
cd android
./gradlew assembleRelease        # macOS/Linux
gradlew.bat assembleRelease      # Windows
```

APK will be at: `mobile/android/app/build/outputs/apk/release/app-release.apk`

---

## Method 3: Use Expo Go (Instant Testing)

**For testing without APK:**

```bash
cd mobile
npx expo start

# Scan QR code with Expo Go app
# Available on both Google Play & App Store
```

---

## Method 4: GitHub Actions Setup (Automatic)

**For automated builds on every push:**

1. Create Expo account: https://expo.dev
2. Get EAS token from: https://expo.dev/accounts/[username]/settings/tokens
3. Add token to GitHub:
   - Go to: https://github.com/project8349-png/PRASHANT/settings/secrets/actions
   - Create secret: `EAS_TOKEN`
   - Paste your token
4. Push code: `git push origin main`
5. APK builds automatically!

---

## Quick Setup for Local APK Build

### Windows
```bash
cd mobile
.\build-apk.bat
```

### Mac/Linux
```bash
cd mobile
bash build-apk.sh
```

---

## Recommended Setup (Complete)

For best results, use **EAS**:

### Step-by-Step:

1. **Create Expo Account**
   ```
   Go to: https://expo.dev
   Sign up (free)
   ```

2. **Create EAS Token**
   ```
   Go to settings
   Create new token
   Copy token
   ```

3. **Build APK**
   ```bash
   npm install -g eas-cli
   eas login
   cd mobile
   eas build --platform android
   ```

4. **Download APK**
   ```
   Go to EAS dashboard
   Click "Artifacts"
   Download APK
   ```

5. **Install on Phone**
   ```
   Transfer APK to phone
   Open and install
   Done!
   ```

---

## FAQ

**Q: Why doesn't GitHub Actions show APK?**
A: GitHub Actions needs either EAS token or Android SDK setup. EAS is easier!

**Q: Can I test without building APK?**
A: Yes! Use Expo Go app with `npx expo start`

**Q: Is EAS free?**
A: Yes, 30 min of free build time per month. Great for side projects!

**Q: How do I install the APK?**
A: Copy to phone → File Manager → Tap APK → Install (allow unknown sources)

**Q: What's the APK size?**
A: About 50-100 MB for Android

---

## What Happens After You Build

✅ Real APK file (`*.apk`)
✅ Can be installed on any Android 5.0+
✅ Works with or without internet
✅ Ready to share with friends
✅ Can submit to Google Play Store

---

## I Recommend This Setup

```bash
# 1. Install EAS
npm install -g eas-cli

# 2. Create free account
eas login

# 3. Build APK
cd mobile
eas build --platform android

# 4. Join us on Discord/GitHub
# Share your app with everyone!
```

This takes 10 minutes total and gets you a professional APK!

---

**Ready? Start with EAS - it's the easiest way!** 🚀
