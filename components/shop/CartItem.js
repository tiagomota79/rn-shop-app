import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Utils
import { formatPrice } from '../../utils';

const CartItem = ({ productData, onRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, width: '55%' }} numberOfLines={1}>
        {productData.productTitle}
      </Text>
      <Text style={styles.quantity}>{productData.quantity}</Text>
      <Text
        style={{
          ...styles.text,
          ...styles.subTotal,
        }}
      >
        {Platform.OS === 'ios'
          ? formatPrice(productData.sum)
          : `$${productData.sum.toFixed(2)}`}
      </Text>
      <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
          size={20}
          color={colours.red}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: stylesConstants.padding,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  subTotal: {
    color: colours.priceColour,
    width: '25%',
    textAlign: 'right',
  },
  quantity: {
    fontFamily: 'open-sans',
    width: '15%',
    textAlign: 'right',
  },
  deleteButton: {
    width: '5%',
    marginHorizontal: stylesConstants.margin / 4,
  },
});

export default CartItem;
