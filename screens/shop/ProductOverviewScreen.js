import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import ProductItem from '../../components/shop/ProductItem';

// Slices
import { selectProducts } from '../../slices/productsSlice';

const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector(selectProducts);

  const handleViewDetails = (itemData) => {
    navigation.navigate({
      routeName: 'ProductDetail',
      params: { productData: itemData.item },
    });
  };

  const handleAddToCart = (itemData) => {
    console.log(`${itemData.item.title} added to cart`);
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
