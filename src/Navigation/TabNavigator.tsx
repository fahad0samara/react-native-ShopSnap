import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import Home from "../screen/Home/Home";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffff",
        tabBarIcon: ({ color, focused }) => {
          let iconName; 

            if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
            }
                else if (route.name === "search") {
                    iconName = focused ? "search" : "search-outline";

            } else if (route.name === "Cart") {
                iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
            }



    

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="search" component={Home} />
      <Tab.Screen name="Cart" component={Home} />
      <Tab.Screen name="Profile" component={Home} />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#ff9133",


    



    
    

  },
});

export default TabNavigator;
