import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { app } from '../../data/FirsebaseData'; 
import { useNavigation } from '@react-navigation/native';

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  checkAuthStatus: () => void; // Add the checkAuthStatus function
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOutUser: async () => {},
  checkAuthStatus: () => {}, // Initialize the checkAuthStatus function
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
    const navigation = useNavigation(); // Initialize useNavigation hook


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigation.navigate('TabNavigator'); // Navigate to TabNavigator if user is authenticated
      } else {
        navigation.navigate('Login'); // Navigate to Splash screen if user is not authenticated
      }
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const checkAuthStatus = async () => {
    // Check if there is a user authenticated
    const currentUser = auth.currentUser;
    setUser(currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOutUser, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
