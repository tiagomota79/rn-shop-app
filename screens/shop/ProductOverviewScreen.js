import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

// Slices
import { selectProducts, setProducts } from '../../slices/productsSlice';
import { addToCart } from '../../slices/cartSlice';

const ProductOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

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
  return <FlatList data={products} renderItem={handleRender} />;
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

export default ProductOverviewScreen;
