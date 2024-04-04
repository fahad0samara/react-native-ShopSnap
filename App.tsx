import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import SplashScreen from './src/screen/SplashScreen';

import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import StartScreen from './src/screen/StartScreen';
import Profile from './src/screen/Profile';
import Home from './src/screen/Home/Home';
import TabNavigator from './src/Navigation/TabNavigator';
import DetailScreen from './src/screen/Home/DetailScreen';
import { CartProvider } from './src/context/CartContext';
import CartScreen from './src/screen/cart/CartScreen';
import { ToastProvider } from './src/utils/ToastContext';
import { View } from 'react-native';



const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
    <AuthProvider>
      <CartProvider>
      <ToastProvider>
        <AppNavigation />
      </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </NavigationContainer>
  );
};

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
    headerShown: false 
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} 
      options={{ headerShown: false }}
      />
      {user ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : (
        <>
  <Stack.Screen name="Login" component={LoginScreen}
        options={{ headerShown: false }}
   />
        <Stack.Screen name="Register" component={RegisterScreen}
        options={{ headerShown: false }}
         />
              <Stack.Screen name="TabNavigator" component={TabNavigator}
        options={{ headerShown: false }}
        
         />
             <Stack.Screen name="DetailScreen" component={DetailScreen} />
             <Stack.Screen name="CartScreen" component={CartScreen} />
        </>

      




      )}
    </Stack.Navigator>
  );
};

export default App;
