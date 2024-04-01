import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryProps {
  item: { name: string };
  onPress: (title: string) => void;
  selected: string;
  
}

const Category: React.FC<CategoryProps> = ({ item, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        item.name === selected
          ? { backgroundColor: "#F59E0B", borderWidth: 2 }
          : { backgroundColor: "#fff", borderWidth: 2 },
      ]}
      onPress={() => onPress(item.name)}
    >
      <Ionicons
        name={item.name === selected 
            ? "checkmark-circle-outline" 
            : "ellipse-outline"}
        size={24}
        color={item.name === selected ? "#ffffff" : "#6B7280"}
        style={styles.icon}
      />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginBottom: 8,
    borderColor: "#ff9133",
  },
  icon: {
    marginRight: 4,


  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",


  },
});

export default Category;
