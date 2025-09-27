import AsyncStorage from '@react-native-async-storage/async-storage';

// Web-compatible storage wrapper
const storage = {
  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined') {
        // Web environment
        return Promise.resolve(localStorage.setItem(key, value));
      } else {
        // React Native environment
        return AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Storage setItem error:', error);
      return Promise.resolve();
    }
  },
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        // Web environment
        return Promise.resolve(localStorage.getItem(key));
      } else {
        // React Native environment
        return AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.warn('Storage getItem error:', error);
      return Promise.resolve(null);
    }
  },
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        // Web environment
        return Promise.resolve(localStorage.removeItem(key));
      } else {
        // React Native environment
        return AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Storage removeItem error:', error);
      return Promise.resolve();
    }
  },
};

export default storage;
