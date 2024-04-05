import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user, checkAuthStatus } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ShopSnap.png")}
        style={styles.image}
      />

      <ActivityIndicator size="large" color="#ff9133" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fbeedd",
  },
  image: {
    width: "100%",
    height: "50%",
    marginBottom: 20,
  },
});

export default SplashScreen;
