import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const coupons = [
  {
    id: 1,
    title: "50% Off",
    description: "Use code SAVE50",
    image: require("../../../assets/Coupons0.png"),
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "On orders over $50",
    image: require("../../../assets/free.png"),
  },
];

const CouponCards = () => {
  const renderCoupon = ({ item }) => (
    <TouchableOpacity key={item.id} style={[styles.couponCard, { backgroundColor: item.id % 2 === 0 ? "#ff9133" : "#000" }]}>
      <Image source={item.image} style={styles.couponImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={coupons}
      renderItem={renderCoupon}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CouponCards;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  couponCard: {
    width: 300,
    height: 160,
    marginRight: 10,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  couponImage: {
    width: 100,
    height: "100%",
    resizeMode: "contain",
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 18,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});
