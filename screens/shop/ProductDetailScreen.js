import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

const ProductDetailScreen = ({ navigation }) => {
  const productData = navigation.getParam('productData');

  return (
    <View style={styles.container}>
      <Text>{productData.title}</Text>
      <Text>{productData.price}</Text>
      <Text>{productData.description}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam('productData').title;

  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailScreen;
