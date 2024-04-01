import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import axios from "axios";

import API_URL from "../apiConfig";
import { products } from "../Type";
import Category from "./Home/components/Category";
import ProductsCard from "./Home/components/ProductsCard";
import CouponCards from "./Home/CouponCards";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [data, setData] = useState<{ products: products[] }>({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ products: products[] }>(
        `${API_URL}/products/all`
      );
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code outside of 2xx
          setError(`Server responded with status ${error.response.status}`);
          console.log(error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          setError("Request made but no response received");
          console.log(error.request);
        } else {
          // Something happened in setting up the request
          setError("Error setting up the request");
          console.log("Error", error.message);
        }
      } else {
        // Network error or other non-Axios error
        setError("Network Error: Please check your internet connection");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryPress = (title: string) => {
    setSelectedCategory(title);
  };

  const filteredBikes = data.products.filter((product) =>
    product.categories.some((cat) => cat.name === selectedCategory)
  );

  const uniqueCategories =
    data.products.length > 0
      ? Array.from(
          new Set(
            data.products
              .map((product) => product.categories.map((cat) => cat.name))
              .flat()
          )
        )
      : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 24, color: "#000000" }}>Hello, Fahad</Text>
            <Text
              style={{
                fontSize: 18,
                color: "#F59E0B",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Let's find your product!
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <IonIcon name="notifications-outline" size={25} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coupons</Text>
          <Text style={styles.sectionSubtitle}>
            Check out our latest offers
          </Text>

          <CouponCards />
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <FlatList
            data={uniqueCategories}
            renderItem={({ item }) => (
              <Category
                item={{ name: item }}
                onPress={handleCategoryPress}
                selected={selectedCategory}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        ) : error ? (
          <Text style={styles.errorText}>
            An error occurred while fetching the data. {error}.
          </Text>
        ) : (
          <View style={styles.bicycleListContainer}>
            <FlatList
              data={filteredBikes}
              renderItem={({ item }) => <ProductsCard product={item} />}
              keyExtractor={(item) => item._id}
              style={styles.bicycleList}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbeedd",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container1: {
    paddingHorizontal: 15,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  titleText: {
    color: "#6B7280",
    fontSize: 32,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },

  categoriesContainer: {
    marginTop: 2,
  },
  categoriesTitle: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  categoriesList: {
    marginTop: 10,
  },
  bicycleListContainer: {
    marginTop: 20,
    flex: 1,
  },
  bicycleList: {
    marginTop: 5,
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
