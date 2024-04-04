import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useCart } from "../../context/CartContext";
import { ProdactCardProps, SubtotalProps } from "../../Type";

const Subtotal: React.FC<SubtotalProps> = ({ subtotal, shipping, total }) => {
  return (
    <View style={styles.subtotalContainer}>
      <View style={styles.subtotalItem}>
        <Text style={styles.subtotalText}>Subtotal</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.price}>{subtotal.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.subtotalItem}>
        <Text style={styles.subtotalText}>Shipping</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.price}>{shipping.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.subtotalItem}>
        <Text style={styles.subtotalText}>Total</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.price}>{total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const ProdactCard: React.FC<ProdactCardProps> = ({
  item,
  onRemove,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  const handleDelete = () => {
    onRemove(item._id);
  };

  const handleIncreaseQuantity = () => {
    onIncreaseQuantity(item._id);
  };

  const handleDecreaseQuantity = () => {
    onDecreaseQuantity(item._id);
  };

  return (
    <View style={styles.bicycleCardContainer}>
      <View style={styles.bicycleCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.bikeName}>{item.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>
              {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.handleDelete} onPress={handleDelete}>
          <IonIcon name="trash-outline" color="white" size={20} />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecreaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={handleIncreaseQuantity}
            style={styles.quantityButtonIN}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Cart: React.FC = () => {
  const {
    cartItems,
    clearCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();
  // Calculate subtotal, shipping, and total based on cart items
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const total = subtotal + shipping;

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            <Text style={styles.emptyCartText}>
              add some items to your cart.
            </Text>
          </View>
        ) : (
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Cart list</Text>
              <Text style={styles.subheaderText}>
                ({cartItems.length} items)
              </Text>
            </View>
            <TouchableOpacity onPress={handleClearCart}>
              <Text style={styles.clearButton}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <ProdactCard
              item={item}
              onRemove={removeFromCart}
              onDecreaseQuantity={decreaseQuantity}
              onIncreaseQuantity={increaseQuantity}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.cardsContainer}
        />

        {cartItems.length > 0 && (
          <Subtotal subtotal={subtotal} shipping={shipping} total={total} />
        )}
        {cartItems.length > 0 && (
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container1: {
    paddingHorizontal: 15,
    flex: 1,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subheaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
  blankContainer: {
    flexDirection: "row",
  },
  blankText: {
    color: "white",
  },

  clearButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },

  cardsContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  bicycleCardContainer: {
    marginBottom: 15,
  },
  bicycleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  bikeType: {},
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  currency: {
    fontSize: 16,
    color: "#F59E0B",
    fontWeight: "bold",
    marginRight: 3,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  interactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonIN: {
    backgroundColor: "#F59E0B",
    borderRadius: 50,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 1,
    marginVertical: -4,
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  subtotalContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  subtotalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 15,
  },
  checkoutButton: {
    backgroundColor: "#F59E0B",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  handleDelete: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
