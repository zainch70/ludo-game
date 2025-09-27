# 📦 Installation Commands - Ludo Game App

This document contains all the commands you need to execute to install dependencies and set up the Ludo Game app.

## 🚀 Quick Installation (Copy & Paste)

### Step 1: Install Global Dependencies
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
npx expo --version
```

### Step 2: Install Project Dependencies
```bash
# Navigate to project directory
cd C:\Users\HP\Desktop\hassan

# Install all project dependencies
npm install
```

### Step 3: Start the Development Server
```bash
# Start Expo development server
npx expo start

# Alternative: Start with cache clear
npx expo start --clear

# Alternative: Start on specific port
npx expo start --port 8100
```

## 📋 Complete Installation Process

### Prerequisites Installation
```bash
# 1. Install Node.js (download from nodejs.org)
# 2. Verify Node.js installation
node --version

# 3. Verify npm installation
npm --version

# 4. Install Expo CLI globally
npm install -g @expo/cli

# 5. Verify Expo CLI installation
npx expo --version
```

### Project Setup
```bash
# 1. Navigate to project directory
cd C:\Users\HP\Desktop\hassan

# 2. Install all dependencies
npm install

# 3. Check for any missing dependencies
npx expo install --fix

# 4. Start the development server
npx expo start
```

## 🔧 Troubleshooting Commands

### If Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### If Expo CLI Issues
```bash
# Update Expo CLI to latest version
npm install -g @expo/cli@latest

# Or uninstall and reinstall
npm uninstall -g @expo/cli
npm install -g @expo/cli
```

### If Port Issues
```bash
# Start on different port
npx expo start --port 8100
npx expo start --port 8101
npx expo start --port 8102
```

## 📱 Mobile Setup Commands

### For Mobile Development
```bash
# Start development server
npx expo start

# Then scan QR code with Expo Go app on your phone
```

### For Web Development
```bash
# Start web development server
npx expo start --web

# Or start all platforms
npx expo start
# Then press 'w' for web
```

## 🛠 Development Commands

### Useful Development Commands
```bash
# Start with cache clear
npx expo start --clear

# Start with reset cache
npx expo start --reset-cache

# Check for updates
npx expo install --fix

# Run on specific platform
npx expo run:android
npx expo run:ios
npx expo run:web
```

### Build Commands
```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Build for web
npx expo build:web
```

## 🔍 Verification Commands

### Check Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Expo CLI version
npx expo --version

# Check project dependencies
npm list

# Check for outdated packages
npm outdated
```

### Check Project Status
```bash
# Check if project is running
npx expo start --help

# Check project configuration
npx expo config

# Check for issues
npx expo doctor
```

## 📦 Package Management Commands

### Install Specific Packages
```bash
# Install a new package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Install globally
npm install -g package-name
```

### Update Packages
```bash
# Update all packages
npm update

# Update specific package
npm update package-name

# Update to latest version
npm install package-name@latest
```

## 🚨 Common Error Fixes

### Permission Errors (Windows)
```bash
# Run as administrator
# Or use PowerShell as administrator
```

### Network Errors
```bash
# Clear npm cache
npm cache clean --force

# Use different registry
npm install --registry https://registry.npmjs.org/
```

### Port Already in Use
```bash
# Kill process on port 8081
npx kill-port 8081

# Or use different port
npx expo start --port 8100
```

## 📋 Complete Command Sequence

### Full Setup (Copy & Paste All)
```bash
# 1. Install Expo CLI
npm install -g @expo/cli

# 2. Navigate to project
cd C:\Users\HP\Desktop\hassan

# 3. Install dependencies
npm install

# 4. Start development server
npx expo start
```

### For Mobile Testing
```bash
# 1. Start server
npx expo start

# 2. Install Expo Go app on your phone
# 3. Scan QR code with phone
# 4. App opens on mobile device
```

### For Web Testing
```bash
# 1. Start server
npx expo start

# 2. Press 'w' for web
# 3. App opens in browser
```

## ✅ Success Indicators

### After Installation, You Should See:
```bash
# Terminal output showing:
✓ Starting project at C:\Users\HP\Desktop\hassan
✓ React Compiler enabled
✓ Starting Metro Bundler
✓ QR code displayed
✓ Web is waiting on http://localhost:8081
```

### In Browser/Phone:
- Ludo Game interface loads
- No error messages
- Navigation works
- Game features accessible

## 🆘 If Commands Don't Work

### Check These First:
1. **Node.js installed**: `node --version`
2. **npm working**: `npm --version`
3. **In correct directory**: `pwd` or `cd`
4. **Internet connection**: Test with `ping google.com`

### Still Having Issues?
```bash
# Get help
npx expo --help
npm help install

# Check logs
npx expo start --verbose
```

---

**Copy and paste these commands in order to get your Ludo Game app running! 🎮**
