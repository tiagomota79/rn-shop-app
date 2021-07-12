import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

// Slices
import { selectOrders } from '../../slices/orderSlice';

const OrderScreen = () => {
  const orders = useSelector(selectOrders);

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

export default OrderScreen;
