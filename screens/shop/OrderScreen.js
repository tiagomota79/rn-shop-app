import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

// Slices
import { selectOrders, setOrders } from '../../slices/orderSlice';

// Constants
import colours from '../../constants/colours';

const OrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(selectOrders);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(setOrders());
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      loadOrders
    );

    return () => willFocusSubscription.remove();
  }, [loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colours.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You made no orders yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem orderData={itemData.item} />}
    />
  );
};

OrderScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.white,
  },
  text: {
    fontFamily: 'open-sans',
  },
});

export default OrderScreen;
