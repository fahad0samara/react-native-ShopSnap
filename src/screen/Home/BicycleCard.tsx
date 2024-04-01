import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface BicycleCardProps {
  bike: {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    stockQuantity: number;
    isNewProduct: boolean;
  };
}

const BicycleCard: React.FC<BicycleCardProps> = ({ bike }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: bike.image }} style={styles.image} 
            resizeMode="cover"
        />
        {bike.discountPercentage > 0 && (
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{bike.discountPercentage}% OFF</Text>
          </View>
        )}
        <Text style={styles.stock}>{bike.stockQuantity} in stock</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>
            {bike.name.length > 20 ? bike.name.substring(0, 16) + ".." : bike.name}

        </Text>
        <View style={styles.priceContainer}>
          {bike.discountPercentage > 0 && (
            <Text style={styles.discountedPrice}>${bike.originalPrice}</Text>
          )}
          <Text style={styles.price}>${bike.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    width: "45%",
    marginHorizontal: "2.5%",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  discountContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#F59E0B",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    
  },
  stock: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    color: "#ffffff",
    borderRadius: 5,
    fontSize: 12,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
   
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 3,
  },
  discountedPrice: {
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: "line-through",
    color: "#888888",
  },
});

export default BicycleCard;
