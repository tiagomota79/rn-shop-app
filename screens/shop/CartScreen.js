import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';

// Components
import CartItem from '../../components/shop/CartItem';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Slices
import { selectItemsInCart, selectTotalAmount } from '../../slices/cartSlice';
import { formatPrice } from '../../utils';

const CartScreen = () => {
  const cartTotal = useSelector(selectTotalAmount);
  const cartItems = useSelector(selectItemsInCart);

  const objectOfCartsToArray = () => {
    const arrayOfCartItems = [];

    for (const key in cartItems) {
      arrayOfCartItems.push({
        id: key,
        productTitle: cartItems[key].productTitle,
        productPrice: cartItems[key].productPrice,
        quantity: cartItems[key].quantity,
        sum: cartItems[key].sum,
      });
    }

    return arrayOfCartItems;
  };

  const arrayOfCartItems = objectOfCartsToArray();

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.cartTotal}>
            {Platform.OS === 'ios'
              ? formatPrice(cartTotal)
              : `$${cartTotal.toFixed(2)}`}
          </Text>
        </Text>
        <Button
          title='Order now'
          onPress={() => {}}
          color={colours.accent}
          disabled={!arrayOfCartItems.length}
        />
      </View>
      {arrayOfCartItems.length > 0 && (
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.tableHeaderText, width: '55%' }}>
            Product
          </Text>
          <Text style={{ ...styles.tableHeaderText, width: '15%' }}>
            Quantity
          </Text>
          <Text style={{ ...styles.tableHeaderText, width: '25%' }}>
            Sub-Total
          </Text>
          <View style={styles.spacer} />
        </View>
      )}
      {!arrayOfCartItems.length && (
        <Text style={styles.emptyCart}>The cart is empty!</Text>
      )}
      <View styles={styles.cartItems}>
        <FlatList
          data={arrayOfCartItems}
          renderItem={(itemData) => (
            <CartItem
              productData={itemData.item}
              onRemove={() => {
                console.log(`${itemData.item.productTitle} removed from cart!`);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    padding: stylesConstants.margin,
  },
  summary: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: stylesConstants.margin,
    padding: stylesConstants.padding,
    backgroundColor: colours.white,
    shadowColor: colours.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: stylesConstants.elevation,
    borderRadius: stylesConstants.borderRadius,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  cartTotal: {
    fontFamily: 'open-sans-bold',
    color: colours.primary,
  },
  emptyCart: {
    fontFamily: 'open-sans',
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: stylesConstants.margin,
    paddingHorizontal: stylesConstants.padding,
  },
  tableHeaderText: {
    fontFamily: 'open-sans',
    fontSize: 10,
  },
  cartItems: {
    width: '100%',
  },
  spacer: {
    width: '5%',
  },
});

export default CartScreen;
