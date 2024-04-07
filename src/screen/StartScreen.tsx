import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



const StartScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Your Ideal E-Commerce Store</Text>
      <Image
        source={require('../../assets/log.png')}
        style={styles.image}
        resizeMode="contain"
      />
           <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleStart}
         style={styles.button}>
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fbeedd',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#ff9133',
  },
  image: {
    width: '100%',
    height: '50%', 
    marginBottom: 20,
  },
  footer: {
    marginTop: 35,
  },
  button: {
    
    backgroundColor: '#ff9133',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default StartScreen;
