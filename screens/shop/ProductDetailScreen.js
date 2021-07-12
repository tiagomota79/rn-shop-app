import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Utils
import { formatPrice } from '../../utils';

const ProductDetailScreen = ({ navigation }) => {
  const productData = navigation.getParam('productData');

  const handleAddToCart = () => {
    console.log(`${productData.title} added to cart!`);
  };

  return (
    <ScrollView>
      {/* <View style={styles.container}> */}
      <Image style={styles.image} source={{ uri: productData.imageUrl }} />
      <Text style={styles.title}>{productData.title}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title='Add to Cart'
          onPress={handleAddToCart}
          color={colours.primary}
        />
      </View>
      <Text style={styles.price}>
        {Platform.OS === 'ios'
          ? formatPrice(productData.price)
          : `$${productData.price}`}
      </Text>
      <Text style={styles.description}>{productData.description}</Text>
      {/* </View> */}
    </ScrollView>
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
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 25,
    color: colours.primary,
    textAlign: 'center',
    marginVertical: stylesConstants.margin / 2,
  },
  buttonContainer: {
    marginVertical: stylesConstants.margin / 2,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: colours.priceColour,
    textAlign: 'center',
    marginVertical: stylesConstants.margin,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: stylesConstants.margin,
  },
});

export default ProductDetailScreen;
