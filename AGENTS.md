# Expo EAS Project - Strict Build Guide

## IMPORTANT: Read this BEFORE any code changes

This document is a post-mortem of building an Expo SDK 54 app with EAS Build + NativeWind + React Query + Expo Router. Every mistake below wasted real time. Learn them, never repeat them.

---

## 1. Project Bootstrap (The ONLY correct way)

```bash
npx create-expo-app@latest <project-name> --template blank-typescript
cd <project-name>
```

**DO NOT** start writing code yet. First install ALL native-compatible dependencies:

```bash
# Install ALL packages using npx expo install (NEVER npm install for native modules)
npx expo install expo-router expo-splash-screen expo-secure-store expo-image expo-linking expo-constants expo-status-bar expo-system-ui react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens @expo/vector-icons @react-native-async-storage/async-storage
# For non-native packages, use npm (but verify compatibility)
npm install nativewind tailwindcss @tanstack/react-query axios --legacy-peer-deps
npm install --save-dev tailwindcss@3 postcss autoprefixer
```

### STRICT RULE #1: Always use `npx expo install` for ANY package that has native code.
- If you use `npm install react-native-svg`, you'll get a version incompatible with the Expo SDK version.
- `npx expo install` picks the exact version that works with your Expo SDK.
- This applies to: `react-native-reanimated`, `react-native-screens`, `react-native-gesture-handler`, `react-native-safe-area-context`, `@react-native-async-storage/async-storage`, `react-native-svg`, `react-native-worklets`, `expo-*` packages, etc.

---

## 2. Mistakes Made & Time Wasted (DO NOT REPEAT)

### Mistake #1: Installing native packages with raw npm
**What happened:** Used `npm install expo-router expo-splash-screen ...` which caused peer dependency conflicts. Had to re-run with `--legacy-peer-deps`.
**Fix:** Always use `npx expo install <pkg>` for native modules. It handles peer deps correctly.

### Mistake #2: Using lucide-react-native without checking native requirements
**What happened:** `lucide-react-native` requires `react-native-svg` which requires native module configuration. Caused Gradle build failures.
**Fix:** Use `@expo/vector-icons` (Ionicons) which comes pre-installed with Expo and needs NO native configuration.

### Mistake #3: Setting `newArchEnabled: false`
**What happened:** Newer `react-native-reanimated` v4+ REQUIRES the New Architecture. Setting it to false caused: `[Reanimated] Reanimated requires new architecture to be enabled.`
**Fix:** `newArchEnabled: true` in app.json is mandatory for Expo SDK 52+ with reanimated v4.

### Mistake #4: Using outdated `@react-native-async-storage/async-storage` v3
**What happened:** AsyncStorage v3 requires a native artifact `org.asyncstorage.shared_storage:storage-android:1.0.0` that doesn't exist in Maven repos. Caused: `Could not find org.asyncstorage.shared_storage:storage-android:1.0.0`
**Fix:** Run `npx expo install @react-native-async-storage/async-storage` to get the Expo-compatible version.

### Mistake #5: Removing react-native-reanimated (thinking it was optional)
**What happened:** `nativewind` depends on `react-native-css-interop` which depends on `react-native-reanimated` at runtime. Removing it broke the entire CSS-in-JS pipeline.
**Fix:** Never remove packages that are transitive dependencies of nativewind. Check the dependency tree first.

### Mistake #6: Not reading Gradle build logs immediately
**What happened:** EAS builds failed with "Gradle build failed with unknown error" but we didn't check the actual log files for 5+ build attempts.
**Fix:** Build log files are available via JSON API. Use `eas build:list --json --limit=1 --status=errored` to get logFile URLs, then download them. The logs are JSON-NDJSON format.

### Mistake #7: Missing `react-native-worklets`
**What happened:** `react-native-reanimated/plugin/index.js` requires `react-native-worklets/plugin`. Without it, Metro bundling fails: `Cannot find module 'react-native-worklets/plugin'`
**Fix:** Both packages must be installed: `npx expo install react-native-reanimated react-native-worklets`

### Mistake #8: Missing `babel-preset-expo` as explicit dependency
**What happened:** Metro couldn't find `babel-preset-expo` even though it's an Expo dependency. The EAS build server had module resolution issues.
**Fix:** Add `babel-preset-expo` as an explicit dependency: `npm install babel-preset-expo --legacy-peer-deps`

---

## 3. The Straightforward Approach (Future Projects)

### Step 1: Create project
```bash
npx create-expo-app@latest <name> --template blank-typescript
cd <name>
```

### Step 2: Install ALL dependencies at once
```bash
# Native modules (use expo install):
npx expo install expo-router expo-splash-screen expo-secure-store expo-image expo-linking expo-constants expo-status-bar expo-system-ui react-native-reanimated react-native-worklets react-native-gesture-handler react-native-safe-area-context react-native-screens @expo/vector-icons @react-native-async-storage/async-storage

# JS-only packages (use npm):
npm install nativewind tailwindcss@3 @tanstack/react-query axios babel-preset-expo
npm install --save-dev tailwindcss@3
```

### Step 3: Configure NativeWind
Create these files BEFORE any source code:
- `babel.config.js` - with reanimated plugin
- `tailwind.config.js` - with `presets: [require("nativewind/preset")]`
- `metro.config.js` - with `withNativeWind`
- `global.css` - with tailwind directives

### Step 4: Set up app.json
Required fields:
```json
{
  "expo": {
    "newArchEnabled": true,
    "runtimeVersion": { "policy": "appVersion" },
    "updates": {
      "url": "https://u.expo.dev/<project-id>",
      "enabled": true,
      "fallbackToCacheTimeout": 0,
      "checkAutomatically": "ON_LOAD"
    }
  }
}
```

### Step 5: Write ALL source code
- types → constants → utils → services → hooks → components → screens
- Test bundling: `npx expo export --platform android` (set NODE_OPTIONS="--max-old-space-size=4096" if memory issues)

### Step 6: EAS setup
```bash
eas init --force          # Create EAS project
eas build:configure       # Configure builds
```

### Step 7: Build
```bash
eas build -p android --profile preview --non-interactive
```

---

## 4. Strict Rules (NEVER BREAK THESE)

### Rule 1: `npx expo install` for ALL native packages
If it touches native code (navigation, images, storage, gestures, animations, icons, etc.), use `npx expo install`. Never `npm install`.

### Rule 2: Use `@expo/vector-icons` ONLY
`lucide-react-native`, `react-native-vector-icons` (raw), and `react-native-svg` add unnecessary native build complexity. `@expo/vector-icons` is pre-configured and needs zero native config.

### Rule 3: `newArchEnabled: true` always
All modern Expo SDK (52+) native packages require the New Architecture. Setting this to false breaks reanimated, screens, and gesture-handler.

### Rule 4: Never remove reanimated
NativeWind v4 uses `react-native-css-interop` which imports `react-native-reanimated` at runtime. Reanimated is NOT optional.

### Rule 5: Read Gradle logs on FIRST failure
When EAS Build says "Gradle build failed with unknown error":
```bash
eas build:list --json --limit=1 --status=errored
# Extract logFiles URL and download it
```
Do NOT guess the error. Read the log.

### Rule 6: Use `npx expo install` for EVERY expo-* package
Including: expo-router, expo-splash-screen, expo-secure-store, expo-image, expo-linking, expo-constants, expo-status-bar, expo-system-ui, etc.

### Rule 7: Remove lucide-react-native from requirements
Replace with `@expo/vector-icons` (Ionicons). Mapping: Search→"search", Heart→"heart"/"heart-outline", User→"person", Home→"home", X→"close", Clock→"time-outline", TrendingUp→"trending-up", ChevronRight→"chevron-forward", Github→"logo-github", Share2→"share", Download→"download", Sparkles→"sparkles", Trash2→"trash", ChevronLeft→"chevron-back"

### Rule 8: Don't commit dist/ or test output
Add `dist/`, `dist-test/`, `.expo/` to `.gitignore` before first commit. The template already has most of these.

### Rule 9: Package.json must have `"main": "expo-router/entry"`
Without this, Expo Router won't work. The template sets `"main": "index.ts"` which must be changed.

### Rule 10: Remove App.tsx and index.ts
These conflict with Expo Router's file-based routing. Delete them:
```bash
rm App.tsx index.ts
```

---

## 5. NativeWind v4 Setup (Copy-Paste)

### babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

### metro.config.js
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
```

### global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 6. EAS Configuration

### eas.json (minimal working)
```json
{
  "cli": { "version": ">= 14.0.0", "requireCommit": false, "appVersionSource": "remote" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal", "android": { "buildType": "apk" } },
    "preview": { "distribution": "internal", "android": { "buildType": "apk" } },
    "production": { "android": { "buildType": "apk" } }
  },
  "submit": { "production": {} }
}
```

### app.json (required EAS fields)
```json
{
  "expo": {
    "runtimeVersion": { "policy": "appVersion" },
    "updates": {
      "url": "https://u.expo.dev/<project-id>",
      "enabled": true,
      "fallbackToCacheTimeout": 0,
      "checkAutomatically": "ON_LOAD"
    },
    "extra": { "eas": { "projectId": "<project-id>" } }
  }
}
```

---

## 7. Checklist for New Projects

```
[ ] npx create-expo-app --template blank-typescript
[ ] npx expo install ALL native packages (see Section 3 Step 2)
[ ] npm install ALL JS packages (see Section 3 Step 2)
[ ] Create babel.config.js, metro.config.js, tailwind.config.js, global.css
[ ] Set main: "expo-router/entry" in package.json
[ ] Delete App.tsx and index.ts
[ ] Set newArchEnabled: true in app.json
[ ] Set runtimeVersion + updates config in app.json
[ ] Write types → constants → utils → services → hooks → components → screens
[ ] Test: npx expo export --platform android
[ ] Git init + commit + push
[ ] eas init --force
[ ] eas build -p android --profile preview
[ ] On failure: read logFiles from eas build:list --json
[ ] On success: share build URL
```

---

## 8. Key Commands Reference

```bash
# Development
npm start                    # Start Expo dev server
npm run android              # Start + open on Android

# Building
eas build -p android --profile preview          # Internal APK
eas build -p android --profile production       # Release APK
eas build --local -p android --profile preview  # Local build (needs Android SDK)

# Updates (Phase 2+)
eas update --branch production --message "description"  # OTA update

# Debugging
eas build:list --json --limit=1 --status=errored        # Get failed build
eas whoami                                               # Verify EAS login
eas project:info                                         # Check project config

# Environment Variables
# Set EXPO_PUBLIC_* vars in eas.json build profiles, or use EAS Secrets:
eas secret:create --name EXPO_PUBLIC_UNSPLASH_ACCESS_KEY --value <key> --type string
```
