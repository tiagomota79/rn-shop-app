import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Constants
import colours from '../constants/colours';

// Screens
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';

// Components
import LogoutButton from '../components/UI/LogoutButton';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? colours.white : colours.primary,
  },
  headerTintColor: Platform.OS === 'ios' ? colours.primary : colours.white,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerLabel: 'Products',
        drawerIcon: (itemInfo) => {
          return (
            <Ionicons
              name={Platform.OS === 'ios' ? 'md-cart' : 'ios-cart'}
              size={25}
              color={itemInfo.tintColor}
            />
          );
        },
      },
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        drawerLabel: 'Orders',
        drawerIcon: (itemInfo) => {
          return (
            <Ionicons
              name={Platform.OS === 'ios' ? 'md-list' : 'ios-list'}
              size={25}
              color={itemInfo.tintColor}
            />
          );
        },
      },
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerLabel: 'Admin',
        drawerIcon: (itemInfo) => {
          return (
            <Ionicons
              name={Platform.OS === 'ios' ? 'md-person' : 'ios-person'}
              size={25}
              color={itemInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: colours.primary,
    },
    contentComponent: (props) => <LogoutButton {...props} />,
    hideStatusBar: true,
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
