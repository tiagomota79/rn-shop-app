import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Utils
import { formatPrice } from '../../utils';
import ProductItemButtons from '../UI/ProductItemButtons';

const ProductItem = ({
  productData,
  onSelectCard,
  leftTitle,
  onLeftButton,
  rightTitle,
  onRightButton,
}) => {
  let TouchableElement = TouchableOpacity;

  if (Platform.OS === 'android') TouchableElement = TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <View style={styles.android}>
        <TouchableElement onPress={onSelectCard} useForeground>
          <View>
            <Image
              style={styles.image}
              source={{ uri: productData.imageUrl }}
            />
            <View style={styles.details}>
              <Text style={styles.title}>{productData.title}</Text>
              <Text style={styles.price}>
                {Platform.OS === 'ios'
                  ? formatPrice(productData.price)
                  : `$${productData.price}`}
              </Text>
            </View>
            <ProductItemButtons
              leftTitle={leftTitle}
              onLeftButton={onLeftButton}
              rightTitle={rightTitle}
              onRightButton={onRightButton}
            />
          </View>
        </TouchableElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
    shadowColor: colours.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: stylesConstants.elevation,
    borderRadius: stylesConstants.borderRadius,
    height: 300,
    margin: stylesConstants.margin,
  },
  android: {
    overflow: 'hidden',
    borderRadius: stylesConstants.borderRadius,
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: stylesConstants.borderRadius,
    borderTopRightRadius: stylesConstants.borderRadius,
  },
  details: {
    height: '15%',
    padding: stylesConstants.padding,
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: colours.priceColour,
    fontFamily: 'open-sans',
  },
});

export default ProductItem;
