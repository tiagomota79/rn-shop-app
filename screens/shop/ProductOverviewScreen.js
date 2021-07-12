import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import ProductItem from '../../components/shop/ProductItem';

// Slices
import { selectProducts } from '../../slices/productsSlice';
import { addToCart } from '../../slices/cartSlice';

const ProductOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

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
      onViewDetails={() => handleViewDetails(itemData)}
      onAddToCart={() => handleAddToCart(itemData)}
    />
  );
  return <FlatList data={products} renderItem={handleRender} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductOverviewScreen;
