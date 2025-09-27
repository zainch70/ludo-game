# 👥 Friend Setup Guide - How to Run the Ludo Game

This guide is for your friends who want to clone and run the Ludo Game app on their own computers.

## 🎯 Quick Setup for Friends

### Step 1: Clone the Repository
```bash
# Clone the repository
git clone <your-repository-url>
cd hassan
```

### Step 2: Install Dependencies
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Install project dependencies
npm install
```

### Step 3: Start the App
```bash
# Start the development server
npx expo start
```

### Step 4: Choose Platform
- **Web**: Press `w` or visit `http://localhost:8081`
- **Mobile**: Install Expo Go app and scan QR code
- **Android**: Press `a` (requires Android Studio)
- **iOS**: Press `i` (requires Xcode on macOS)

## 📋 Detailed Setup Instructions

### Prerequisites (What Your Friend Needs)

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **Git** (for cloning)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

3. **Expo Go App** (for mobile testing)
   - Download from App Store or Google Play

### Complete Setup Process

#### 1. Clone the Repository
```bash
# Navigate to desired directory
cd Desktop  # or any folder they prefer

# Clone the repository
git clone <your-repository-url>
cd hassan
```

#### 2. Install Global Dependencies
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
npx expo --version
```

#### 3. Install Project Dependencies
```bash
# Install all project dependencies
npm install

# Check for any missing dependencies
npx expo install --fix
```

#### 4. Start the Development Server
```bash
# Start the app
npx expo start
```

#### 5. Access the App
- **Web**: Press `w` or go to `http://localhost:8081`
- **Mobile**: Scan QR code with Expo Go app
- **Android**: Press `a` (if Android Studio is installed)
- **iOS**: Press `i` (if Xcode is installed on macOS)

## 🔧 Troubleshooting for Friends

### Common Issues and Solutions

#### 1. "Command not found" errors
```bash
# If npm is not found, reinstall Node.js
# If expo is not found, reinstall Expo CLI
npm install -g @expo/cli
```

#### 2. Port already in use
```bash
# Use different port
npx expo start --port 8100
npx expo start --port 8101
```

#### 3. Installation failures
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 4. Mobile connection issues
- Ensure phone and computer are on same WiFi
- Try manual URL connection in Expo Go
- Check firewall settings

#### 5. Module not found errors
```bash
# Fix missing dependencies
npx expo install --fix
npm install
```

## 📱 Mobile Testing Setup

### For iPhone Users
1. Install **Expo Go** from App Store
2. Start development server: `npx expo start`
3. Open **Camera app** and scan QR code
4. Tap notification to open app

### For Android Users
1. Install **Expo Go** from Google Play
2. Start development server: `npx expo start`
3. Open **Expo Go app** and tap "Scan QR Code"
4. Scan the QR code from terminal

## 🌐 Web Testing Setup

### For Web Users
1. Start development server: `npx expo start`
2. Press `w` for web
3. App opens in browser at `http://localhost:8081`

## 🎮 What Your Friend Will See

### Main Features
- **Ludo Game**: Interactive game board
- **User Authentication**: Login/signup system
- **Social Features**: Friends, chat, leaderboard
- **Room System**: Create and join game rooms
- **Virtual Economy**: Coins and entry fees

### Game Modes
- **2-Player Mode**: Queen play with entry fees
- **5-Player Mode**: Free to play
- **Offline Mode**: Local gameplay
- **Online Mode**: Multiplayer with friends

## 🚀 Quick Commands Summary

### Copy & Paste These Commands
```bash
# 1. Clone repository
git clone <your-repository-url>
cd hassan

# 2. Install dependencies
npm install -g @expo/cli
npm install

# 3. Start app
npx expo start

# 4. Choose platform:
#    - Press 'w' for web
#    - Scan QR code for mobile
#    - Press 'a' for Android
#    - Press 'i' for iOS
```

## 📞 Support for Friends

### If Something Goes Wrong
1. **Check this guide** for common solutions
2. **Ask you** for help
3. **Check the main README.md** for detailed instructions
4. **Look at INSTALLATION_COMMANDS.md** for troubleshooting

### Useful Commands for Troubleshooting
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Expo CLI version
npx expo --version

# Clear cache
npx expo start --clear

# Reset cache
npx expo start --reset-cache
```

## 🎯 Success Indicators

### Your Friend Will Know It's Working When:
- ✅ Terminal shows QR code and "Web is waiting on http://localhost:8081"
- ✅ App loads in browser or on mobile device
- ✅ Ludo Game interface appears
- ✅ No error messages in terminal or app
- ✅ Can navigate between different screens

## 📱 Platform Requirements

### For Web Testing
- Any modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### For Mobile Testing
- **iPhone**: iOS 11.0 or later
- **Android**: Android 6.0 or later
- **Expo Go app** installed
- Same WiFi network as computer

### For Native Development
- **Android**: Android Studio installed
- **iOS**: Xcode installed (macOS only)

## 🎮 Ready to Play!

Once setup is complete, your friend can:
1. **Create an account** or log in
2. **Start playing Ludo** immediately
3. **Invite other friends** to play
4. **Enjoy all the features** of the game

---

**Share this guide with your friends to get them started quickly! 🎮👥**
