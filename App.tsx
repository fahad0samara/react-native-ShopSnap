import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import SplashScreen from "./src/screen/SplashScreen";

import LoginScreen from "./src/screen/LoginScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import StartScreen from "./src/screen/StartScreen";

import TabNavigator from "./src/Navigation/TabNavigator";
import DetailScreen from "./src/screen/Home/DetailScreen";
import { CartProvider } from "./src/context/CartContext";
import CartScreen from "./src/screen/cart/CartScreen";
import { ToastProvider } from "./src/utils/ToastContext";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <StatusBar 
            style={"dark"}
             />
            <AppNavigation />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

const AppNavigation = () => {
  const { user } = useAuth();
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    // Check if user is authenticated
    if (user) {
      setInitialRoute('TabNavigator'); // If authenticated, set initial route to TabNavigator
    } else {
      setInitialRoute('StartScreen'); // If not authenticated, set initial route to StartScreen
    }
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};




export default App;
