import React from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

// Slices
import { deleteProduct, selectUserProducts } from '../../slices/productsSlice';
import { deleteFromCart } from '../../slices/cartSlice';

// Constants
import colours from '../../constants/colours';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(selectUserProducts);

  const handleEditProduct = (productData) => {
    navigation.navigate('EditProduct', { productData });
  };

  const deleteAction = (productData) => {
    dispatch(deleteProduct(productData.id));
    dispatch(deleteFromCart(productData.id));
  };

  const handleDeleteProduct = (productData) => {
    Alert.alert('Are you sure?', `Delete ${productData.title}`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteAction(productData),
      },
    ]);
  };

  if (userProducts.length <= 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You have no products. Add some!</Text>
      </View>
    );
  }

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Product'
          iconName={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
          onPress={() => {
            navigationData.navigation.navigate('EditProduct');
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

export default UserProductsScreen;
