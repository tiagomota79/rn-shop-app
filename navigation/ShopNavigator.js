import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

// Constants
import colours from '../constants/colours';

// Screens
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === 'ios' ? colours.white : colours.primary,
      },
      headerTintColor: Platform.OS === 'ios' ? colours.primary : colours.white,
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans',
      },
    },
  }
);

export default createAppContainer(ProductsNavigator);
