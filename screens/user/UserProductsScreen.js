import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

// Slices
import { deleteProduct, selectUserProducts } from '../../slices/productsSlice';
import { deleteFromCart } from '../../slices/cartSlice';

const UserProductsScreen = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector(selectUserProducts);

  const handleEditProduct = (productData) => {
    console.log(`Enter edition mode for ${productData.title}`);
  };

  const handleDeleteProduct = (productData) => {
    dispatch(deleteProduct(productData.id));
    dispatch(deleteFromCart(productData.id));
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          productData={itemData.item}
          onSelectCard={() => handleEditProduct(itemData.item)}
          leftTitle='Edit Product'
          onLeftButton={() => handleEditProduct(itemData.item)}
          rightTitle='Delete Product'
          onRightButton={() => handleDeleteProduct(itemData.item)}
        />
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Your Products',
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

export default UserProductsScreen;
