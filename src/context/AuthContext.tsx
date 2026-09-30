import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

export interface AppUser {
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  uid?: string;
}

interface AuthContextType {
  user: AppUser | User | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithAdminEmail: (email: string) => void;
  signOut: () => Promise<void>;
  enableDemoAdmin: () => void;
  isDemoAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithAdminEmail: () => {},
  signOut: async () => {},
  enableDemoAdmin: () => {},
  isDemoAdmin: false
});

// Authorized admin list (User email explicitly authorized)
export const ADMIN_EMAILS = [
  'ashikurrahmanyou26@gmail.com',
  'admin@brp.org.bd',
  'info@brp.org.bd'
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Custom authenticated user for Vercel/direct logins
  const [customUser, setCustomUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('brp_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('brp_demo_admin') === 'true';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  const signInWithAdminEmail = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const adminObj: AppUser = {
      email: cleanEmail,
      displayName: cleanEmail === 'ashikurrahmanyou26@gmail.com' ? 'আশিকুর রহমান (সুপার অ্যাডমিন)' : 'প্রশাসনিক কর্মকর্তা',
      photoURL: null,
      uid: `admin-${Date.now()}`
    };
    localStorage.setItem('brp_admin_user', JSON.stringify(adminObj));
    setCustomUser(adminObj);
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
    localStorage.removeItem('brp_admin_user');
    localStorage.removeItem('brp_demo_admin');
    setCustomUser(null);
    setUser(null);
    setIsDemoAdmin(false);
  };

  const enableDemoAdmin = () => {
    localStorage.setItem('brp_demo_admin', 'true');
    setIsDemoAdmin(true);
  };

  const activeUser = user || customUser;

  const isAdmin = Boolean(
    isDemoAdmin || (
      activeUser !== null && 
      (ADMIN_EMAILS.includes(activeUser.email || '') || Boolean(activeUser.email?.endsWith('@brp.org.bd')))
    )
  );

  return (
    <AuthContext.Provider value={{
      user: activeUser,
      isAdmin,
      loading,
      signInWithGoogle,
      signInWithAdminEmail,
      signOut,
      enableDemoAdmin,
      isDemoAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
