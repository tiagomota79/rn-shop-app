import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

// Slices
import { selectProducts, setProducts } from '../../slices/productsSlice';
import { addToCart } from '../../slices/cartSlice';
import { selectAuthState } from '../../slices/authSlice';

// Constants
import colours from '../../constants/colours';

const ProductOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const authState = useSelector(selectAuthState);

  const token = authState.idToken;
  const userId = authState.localId;

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(setProducts({ token, userId }));
    } catch (error) {
      setError(error.response.data);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSubscription.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleViewDetails = (itemData) => {
    navigation.navigate({
      routeName: 'ProductDetail',
      params: { productData: itemData.item },
    });
  };

  const handleAddToCart = (itemData) => {
    dispatch(addToCart(itemData.item));
  };

  const handleRender = (itemData) => (
    <ProductItem
      productData={itemData.item}
      onSelectCard={() => handleViewDetails(itemData)}
      leftTitle='View Details'
      onLeftButton={() => handleViewDetails(itemData)}
      rightTitle='Add to Cart'
      onRightButton={() => handleAddToCart(itemData)}
    />
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>An error ocurred!</Text>
        <Button title='Reload' onPress={loadProducts} color={colours.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colours.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={handleRender}
      onRefresh={loadProducts}
      refreshing={isLoading}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
          onPress={() => {
            navigationData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
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
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'open-sans',
  },
});

export default ProductOverviewScreen;
