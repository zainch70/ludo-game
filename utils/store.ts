import { create } from 'zustand';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface User {
  uid: string;
  name: string;
  email?: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  coins: number;
  level: number;
  isHostApproved: boolean;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (name: string, password: string, email?: string, phone?: string, gender?: string) => Promise<void>;
  logout: () => Promise<void>;
  deductCoins: (amount: number) => boolean;
  addCoins: (amount: number) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  login: async (identifier: string, password: string) => {
    try {
      set({ isLoading: true });
      
      // For demo purposes, use email format
      const email = identifier.includes('@') ? identifier : `${identifier}@demo.com`;
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        set({ 
          user: { ...userData, uid },
          isLoggedIn: true,
          isLoading: false 
        });
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Login failed');
    }
  },

  signup: async (name: string, password: string, email?: string, phone?: string, gender: string = 'other') => {
    try {
      set({ isLoading: true });
      
      // Use email or create one from phone
      const authEmail = email || `${phone}@demo.com`;
      
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
      const uid = userCredential.user.uid;
      
      const userData: User = {
        uid,
        name,
        email,
        phone,
        gender: gender as 'male' | 'female' | 'other',
        coins: gender === 'female' ? 1000 : 500, // Females get more coins
        level: 1,
        isHostApproved: gender === 'female', // Females auto-approved
        isVerified: false,
      };
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', uid), userData);
      
      set({ 
        user: userData,
        isLoggedIn: true,
        isLoading: false 
      });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Signup failed');
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ 
        user: null, 
        isLoggedIn: false,
        isLoading: false 
      });
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  },

  deductCoins: (amount: number) => {
    const { user } = get();
    if (!user || user.coins < amount) {
      return false;
    }
    
    const updatedUser = { ...user, coins: user.coins - amount };
    set({ user: updatedUser });
    
    // Update in Firestore
    if (user.uid) {
      setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
    }
    
    return true;
  },

  addCoins: (amount: number) => {
    const { user } = get();
    if (!user) return;
    
    const updatedUser = { ...user, coins: user.coins + amount };
    set({ user: updatedUser });
    
    // Update in Firestore
    if (user.uid) {
      setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
    }
  },

  setUser: (user: User | null) => {
    set({ 
      user, 
      isLoggedIn: !!user,
      isLoading: false 
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

// Initialize auth state listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (user) => {
    const { setUser, setLoading } = useAuth.getState();
    
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser({ ...userData, uid: user.uid });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  });
}
