import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DetailScreenProps {
  route: { params: { product: Product } };
}

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  isNewProduct: boolean;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {product.discountPercentage > 0 && (
          <Text style={styles.discount}>Save {product.discountPercentage}%</Text>
        )}
        {product.isNewProduct && (
          <Text style={styles.newProduct}>New!</Text>
        )}
      </View>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{product.name}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceContainer}>
          {product.originalPrice > 0 && (
            <Text style={styles.discountedPrice}>Was ${product.originalPrice}</Text>
          )}
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#F59E0B" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F59E0B",
  },
  discount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#F59E0B",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 400,
    marginTop: 10,
  },
  detailsContainer: {
    backgroundColor: "#F59E0B",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    marginTop: -20,
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: "auto",
  },
  discountedPrice: {
    fontSize: 18,
    marginRight: 20,
    textDecorationLine: "line-through",
    color: "#fff",
  },
  newProduct: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor:"#000",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: "auto",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F59E0B",
    marginLeft: 10,
  },
});

export default DetailScreen;
