import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../context/CartContext";
import { Product } from "../../Type";




const DetailScreen: React.FC<{ route: { params: { product: Product } }, navigation: any }> = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {product.discountPercentage > 0 && (
          <Text style={styles.discount}>
            Save {product.discountPercentage}%
          </Text>
        )}
        {product.isNewProduct && <Text style={styles.newProduct}>New!</Text>}
      </View>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{product.name}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceContainer}>
          {product.originalPrice > 0 && (
            <Text style={styles.discountedPrice}>
              Was ${product.originalPrice}
            </Text>
          )}
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text style={styles.stock}>In stock: {product.stockQuantity}</Text>
        <TouchableOpacity
          onPress={handleAddToCart}
         style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#F59E0B" />
          <Text style={styles.addButtonText}
       
          >Add to Cart</Text>
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
  newProduct: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#000",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 400,
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: "#F59E0B",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#000",
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
    color: "#000",
    marginLeft: "auto",
  },
  discountedPrice: {
    fontSize: 18,
    marginRight: 20,
    textDecorationLine: "line-through",
    color: "#000",
  },
  stock: {
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  addButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: "auto",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default DetailScreen;
