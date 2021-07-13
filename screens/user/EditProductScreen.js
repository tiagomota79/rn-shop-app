import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

// Constants
import CustomHeaderButton from '../../components/UI/HeaderButton';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Slices
import { createProduct, updateProduct } from '../../slices/productsSlice';

const EditProductScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productData = navigation.getParam('productData');

  useEffect(() => {
    if (productData) {
      setTitle(productData.title);
      setImageUrl(productData.imageUrl);
      setDescription(productData.description);
    }
  }, [productData]);

  const handleSubmit = useCallback(() => {
    if (productData) {
      dispatch(
        updateProduct({
          id: productData.id,
          title,
          imageUrl,
          description,
        })
      );
    } else {
      dispatch(
        createProduct({
          title,
          imageUrl,
          price,
          description,
        })
      );
    }
    navigation.goBack();
  }, [productData, title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!productData && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navigationData) => {
  const productData = navigationData.navigation.getParam('productData');

  const submitFunction = navigationData.navigation.getParam('submit');

  return {
    headerTitle: productData ? `Edit ${productData.title}` : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: stylesConstants.margin,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: stylesConstants.margin / 2,
  },
  input: {
    fontFamily: 'open-sans',
    padding: stylesConstants.padding,
    backgroundColor: colours.lightGrey,
    borderRadius: stylesConstants.borderRadius,
  },
});

export default EditProductScreen;
