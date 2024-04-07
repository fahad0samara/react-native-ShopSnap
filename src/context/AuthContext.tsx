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
          navigation.reset({ // Reset navigation stack after logging in
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          });
        } else {
          navigation.reset({ // Reset navigation stack after logging out
            index: 0,
            routes: [{ name: 'StartScreen' }],
          });
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
    navigation.navigate('Login') // Navigate to Login screen after logout

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
