import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

// Components
import Card from '../UI/Card';

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
    <Card style={styles.container}>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
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
