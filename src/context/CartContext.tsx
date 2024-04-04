import React, { createContext, useState, useEffect, useContext } from "react";
import { Product } from "../Type";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const defaultValues: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultValues);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart items from AsyncStorage on component mount
    loadCartItems();
  }, []);

  useEffect(() => {
    // Save cart items to AsyncStorage whenever cartItems change
    saveCartItems();
  }, [cartItems]);

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem("@cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem("@cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };

  const addToCart = (item: Product) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const decreaseQuantity = (itemId: string) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === itemId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity--;
        setCartItems(updatedCartItems);
      }
    }
  };

  const increaseQuantity = (itemId: string) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === itemId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
