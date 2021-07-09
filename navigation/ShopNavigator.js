import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

// Constants
import colours from '../constants/colours';

// Screens
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === 'ios' ? colours.white : colours.primary,
      },
      headerTintColor: Platform.OS === 'ios' ? colours.primary : colours.white,
    },
  }
);

export default createAppContainer(ProductsNavigator);
