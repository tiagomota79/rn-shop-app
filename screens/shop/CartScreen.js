import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import CartItem from '../../components/shop/CartItem';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Slices
import {
  clearCart,
  removeFromCart,
  selectItemsInCart,
  selectTotalAmount,
} from '../../slices/cartSlice';
import { addOrder } from '../../slices/orderSlice';

// Utils
import { formatPrice } from '../../utils';

const CartScreen = () => {
  const dispatch = useDispatch();

  const totalAmount = useSelector(selectTotalAmount);
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

    return arrayOfCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  const arrayOfCartItems = objectOfCartsToArray();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleOrderNow = () => {
    dispatch(addOrder({ cartItems, totalAmount }));
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.totalAmount}>
            {' '}
            {Platform.OS === 'ios'
              ? formatPrice(totalAmount)
              : `$${totalAmount.toFixed(2)}`}
          </Text>
        </Text>
        <Button
          title='Order now'
          onPress={handleOrderNow}
          color={colours.accent}
          disabled={!arrayOfCartItems.length}
        />
      </View>
      {arrayOfCartItems.length > 0 && (
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.tableHeaderText, width: '55%' }}>
            Product
          </Text>
          <Text
            style={{
              ...styles.tableHeaderText,
              width: '15%',
              textAlign: 'right',
            }}
          >
            Quantity
          </Text>
          <Text
            style={{
              ...styles.tableHeaderText,
              width: '25%',
              textAlign: 'right',
            }}
          >
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
                handleRemoveFromCart(itemData.item);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
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
  totalAmount: {
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
