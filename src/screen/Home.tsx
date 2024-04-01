import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CouponCards from './Home/CouponCards';
const HomeScreen = () => {

  
    const products = [
      { id: 1, name: 'Product 1', price: '$19.99', image: require('../../assets/log.png') },
      { id: 2, name: 'Product 2', price: '$29.99', image: require('../../assets/log.png') },
      { id: 3, name: 'Product 3', price: '$39.99', image: require('../../assets/log.png') },
    ];
  
   
  
    const renderProductCards = () => {
      return products.map(product => (
        <TouchableOpacity key={product.id} style={styles.productCard}>
          <Image source={product.image} style={styles.productImage} />
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardPrice}>{product.price}</Text>
        </TouchableOpacity>
      ));
    };
  
  

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={40} color="#333333" />
          <Text style={styles.greeting}>Good Morning, User!</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coupons</Text>
         
          <CouponCards />
          
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderProductCards()}
          </ScrollView>
        </View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbeedd',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCard: {
    width: 200,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },


  couponCard: {
        width: 290,
        height: 150,
        marginRight: 10,
        borderRadius: 15,

overflow: 'hidden',
        backgroundColor: '#ff9133',


    },
    couponImage: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',

    },
    title1: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        color: '#fff',
    },






  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  cardDescription: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#666666',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: '#333333',
  },
});

export default HomeScreen;
