# Ludo Game - React Native Expo Project

A comprehensive Ludo game application built with React Native, Expo Router, Firebase, and Redux Toolkit. This project features both online and offline gameplay, user authentication, social features, and a virtual economy system.

## 🎮 Features

### Core Game Features
- **2-Player & 5-Player Modes**: Support for different game configurations
- **Online & Offline Play**: Play with friends online or locally
- **Room System**: Create and join game rooms with entry fees
- **Real-time Multiplayer**: Live game updates using Firebase
- **Sound Effects**: Immersive audio experience with dice rolls and game sounds
- **Animations**: Smooth Lottie animations for dice rolls and celebrations

### Social Features
- **User Authentication**: Email/Phone login with gender selection
- **Friends System**: Add and manage friends
- **Chat System**: Real-time messaging between friends
- **Leaderboard**: Track player rankings and achievements
- **Profile Management**: User profiles with coins and statistics

### Virtual Economy
- **Coin System**: Earn and spend virtual currency
- **Entry Fees**: Pay coins to join premium games
- **Host Permissions**: Special privileges for approved hosts
- **Queen Rooms**: Exclusive game modes with special rules

## 🛠 Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based routing system
- **TypeScript/JavaScript**: Type-safe development
- **Expo SDK**: Development tools and APIs

### State Management
- **Zustand**: Global app state (authentication, user data)
- **Redux Toolkit**: Game state management
- **Redux Persist**: State persistence across sessions

### Backend & Database
- **Firebase**: Backend-as-a-Service
- **Firestore**: NoSQL database for real-time data
- **Firebase Auth**: User authentication
- **Firebase Realtime Database**: Live game updates

### UI/UX Libraries
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **Lucide React Native**: Modern icon library
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch interactions
- **React Native Animatable**: Component animations
- **Lottie React Native**: JSON-based animations
- **React Native Modal**: Modal components

### Development Tools
- **npm**: Package management
- **Expo CLI**: Development and deployment tools
- **Metro Bundler**: JavaScript bundler

## 📁 Project Structure

```
hassan/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication routes
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Registration screen
│   ├── (tabs)/                   # Main app tabs
│   │   ├── index.tsx            # Home dashboard
│   │   ├── friends.tsx          # Friends list
│   │   ├── rooms.tsx            # Game rooms
│   │   └── settings.js          # Settings
│   ├── Ludo/                     # Ludo game components
│   │   ├── components/          # Game UI components
│   │   │   ├── Dice.js          # Dice component
│   │   │   ├── WinModal.js      # Victory modal
│   │   │   ├── redux/           # Game state management
│   │   │   └── assets/          # Game assets (images, sounds)
│   │   ├── create-room.tsx      # Room creation
│   │   ├── game-room.tsx        # Game room interface
│   │   ├── offline.tsx          # Offline game mode
│   │   └── Ludo.jsx             # Main game component
│   ├── ludo-menu.jsx            # Game menu
│   ├── join-rooms.tsx           # Room joining interface
│   └── components/              # Shared UI components
├── utils/                        # Utility functions
│   ├── firebase.ts              # Firebase configuration
│   ├── store.ts                 # Zustand store
│   ├── api.ts                   # API functions
│   └── constants.ts             # App constants
├── package.json                  # Dependencies
└── app.json                     # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

4. **Git** (for version control)
   - Download from [git-scm.com](https://git-scm.com/)

### Quick Installation (Copy & Paste)

```bash
# 1. Install Expo CLI globally
npm install -g @expo/cli

# 2. Navigate to project directory
cd C:\Users\HP\Desktop\hassan

# 3. Install all project dependencies
npm install

# 4. Start the development server
npx expo start
```

### Detailed Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd hassan
   ```

2. **Install Global Dependencies**
   ```bash
   # Install Expo CLI globally
   npm install -g @expo/cli
   
   # Verify installation
   npx expo --version
   ```

3. **Install Project Dependencies**
   ```bash
   # Install all project dependencies
   npm install
   
   # Check for any missing dependencies
   npx expo install --fix
   ```

4. **Firebase Configuration**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase config and update `utils/firebase.ts`

5. **Environment Setup**
   - Update Firebase configuration in `utils/firebase.ts`
   - Modify constants in `utils/constants.ts` if needed

### Running the Project

#### Development Server

1. **Start the Expo Development Server**
   ```bash
   npx expo start
   ```

2. **Choose Your Platform**
   - **Web**: Press `w` or visit `http://localhost:8081`
   - **Android**: Press `a` (requires Android Studio/emulator)
   - **iOS**: Press `i` (requires Xcode on macOS)
   - **Mobile**: Scan QR code with Expo Go app

#### Alternative Ports

If the default port (8081) is busy, use a different port:
```bash
npx expo start --port 8100
npx expo start --port 8101
npx expo start --port 8102
```

#### Web Development

For web-specific development:
```bash
npx expo start --web
```

#### Mobile Development

For mobile testing:
```bash
# Start development server
npx expo start

# Install Expo Go app on your phone
# Scan QR code to open app on mobile device
```

### Project URLs

Once running, you can access:
- **Main App**: `http://localhost:8081`
- **Game Menu**: `http://localhost:8081/ludo-menu`
- **Create Room**: `http://localhost:8081/Ludo/create-room`
- **Join Rooms**: `http://localhost:8081/join-rooms`

## 🎯 Key Routes and Navigation

### Authentication Routes
- `/login` - User login
- `/signup` - User registration

### Main App Routes
- `/` - Home dashboard
- `/ludo-menu` - Game menu
- `/friends` - Friends list
- `/rooms` - Game rooms
- `/profile` - User profile

### Game Routes
- `/Ludo/create-room` - Create game room
- `/Ludo/join-room` - Join existing room
- `/Ludo/offline` - Offline game mode
- `/Ludo/game-room` - Active game room
- `/ludo-room/[id]` - Specific game room

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication and Firestore

2. **Update Configuration**
   ```typescript
   // utils/firebase.ts
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

### App Constants

Update `utils/constants.ts` for your specific needs:
```typescript
export const ALLOWED_TEST_PHONE = '+1234567890';
export const mockFriends = [...];
export const mockMessages = [...];
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   npx expo start --port 8100
   npx expo start --port 8101
   npx expo start --port 8102
   ```

2. **Module Not Found Errors**
   ```bash
   npm install
   npx expo install --fix
   ```

3. **Installation Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Firebase Connection Issues**
   - Check Firebase configuration
   - Ensure Firestore rules allow read/write
   - Verify authentication is enabled

5. **AsyncStorage Web Errors**
   - The project includes web-compatible storage
   - Check browser console for specific errors

6. **Sound Issues**
   - Ensure audio files are in correct paths
   - Check device permissions for audio

7. **Mobile Connection Issues**
   - Ensure phone and computer are on same WiFi
   - Try manual URL connection in Expo Go
   - Check firewall settings

### Development Tips

1. **Clear Cache**
   ```bash
   npx expo start --clear
   ```

2. **Reset Metro Bundler**
   ```bash
   npx expo start --reset-cache
   ```

3. **Check Dependencies**
   ```bash
   npm audit
   npm audit fix
   ```

4. **Update Expo CLI**
   ```bash
   npm install -g @expo/cli@latest
   ```

5. **Kill Port Processes**
   ```bash
   npx kill-port 8081
   ```

## 📱 Platform-Specific Notes

### Web Development
- Uses `localStorage` for persistence
- Some native features may not work
- Test on different browsers
- Start with: `npx expo start --web`

### Mobile Development
- Requires Expo Go app for testing
- Some features need device permissions
- Test on both iOS and Android
- Start with: `npx expo start` then scan QR code

### Development Commands
```bash
# Start all platforms
npx expo start

# Web only
npx expo start --web

# Android only
npx expo run:android

# iOS only
npx expo run:ios
```

## 🚀 Deployment

### Web Deployment
```bash
npx expo build:web
```

### Mobile Deployment
```bash
npx expo build:android
npx expo build:ios
```

### Build Commands
```bash
# Build for all platforms
npx expo build:web
npx expo build:android
npx expo build:ios

# Check build status
npx expo build:status
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review Expo documentation
- Check Firebase documentation
- Open an issue in the repository

## 📚 Additional Documentation

- **[INSTALLATION_COMMANDS.md](INSTALLATION_COMMANDS.md)** - Complete installation commands
- **[MOBILE_SETUP.md](MOBILE_SETUP.md)** - Detailed mobile setup guide
- **[FRIEND_SETUP.md](FRIEND_SETUP.md)** - Guide for friends to clone and run the project

## 🎯 Quick Start Summary

```bash
# 1. Install Expo CLI
npm install -g @expo/cli

# 2. Navigate to project
cd C:\Users\HP\Desktop\hassan

# 3. Install dependencies
npm install

# 4. Start development server
npx expo start

# 5. Choose platform:
#    - Press 'w' for web
#    - Scan QR code for mobile
#    - Press 'a' for Android
#    - Press 'i' for iOS
```

---

**Happy Gaming! 🎮**
# ludo-game
