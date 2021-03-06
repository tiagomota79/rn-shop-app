import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartHeaderTitles from '../../components/shop/CartHeaderTitles';

// Components
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

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
import { selectAuthState } from '../../slices/authSlice';

// Utils
import { formatPrice, objectOfCartsToArray } from '../../utils';

const CartScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = useSelector(selectTotalAmount);
  const cartItems = useSelector(selectItemsInCart);
  const authState = useSelector(selectAuthState);

  const token = authState.idToken;
  const userId = authState.localId;

  const arrayOfCartItems = objectOfCartsToArray(cartItems);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleOrderNow = async () => {
    setIsLoading(true);
    await dispatch(
      addOrder({ cartItems: arrayOfCartItems, totalAmount, token, userId })
    );
    dispatch(clearCart());
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.totalAmount}>
            {' '}
            {Platform.OS === 'ios'
              ? formatPrice(totalAmount)
              : `$${totalAmount.toFixed(2)}`}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={colours.primary} />
        ) : (
          <Button
            title='Order now'
            onPress={handleOrderNow}
            color={colours.accent}
            disabled={!arrayOfCartItems.length}
          />
        )}
      </Card>
      {arrayOfCartItems.length > 0 && <CartHeaderTitles fromCart />}
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
              deletable
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
});

export default CartScreen;
