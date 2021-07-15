import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

// Components
import CustomHeaderButton from '../../components/UI/HeaderButton';
import UserInput from '../../components/UI/UserInput';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Slices
import { createProduct, updateProduct } from '../../slices/productsSlice';

// Utils
import { formReducer } from '../../utils';

const EditProductScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const productData = navigation.getParam('productData');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      title: productData ? productData.title : '',
      imageUrl: productData ? productData.imageUrl : '',
      price: '',
      description: productData ? productData.description : '',
    },
    inputValidities: {
      title: productData ? true : false,
      imageUrl: productData ? true : false,
      price: productData ? true : false,
      description: productData ? true : false,
    },
    formIsValid: productData ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error.message, [{ text: 'OK' }]);
    }
  }, [error]);

  const handleSubmit = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check for errors in the form.', [
        { text: 'OK' },
      ]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { title, imageUrl, description, price } = formState.inputValue;

    try {
      if (productData) {
        await dispatch(
          updateProduct({
            id: productData.id,
            title,
            imageUrl,
            description,
          })
        );
      } else {
        await dispatch(
          createProduct({
            title,
            imageUrl,
            price: +price,
            description,
          })
        );
      }

      navigation.goBack();
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }, [dispatch, productData, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  const textChangeHandler = (input, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: 'FORM_INPUT_UPDATE',
      value: text,
      isValid,
      input,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colours.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <UserInput
            label='Title'
            value={formState.inputValue.title}
            onChangeText={(text) => textChangeHandler('title', text)}
            autoCapitalize='words'
          />
          <UserInput
            label='Image URL'
            value={formState.inputValue.imageUrl}
            onChangeText={(text) => textChangeHandler('imageUrl', text)}
          />
          {!productData && (
            <UserInput
              label='Price'
              value={formState.inputValue.price}
              onChangeText={(text) => textChangeHandler('price', text)}
              keyboardType='decimal-pad'
            />
          )}
          <UserInput
            label='Description'
            value={formState.inputValue.description}
            onChangeText={(text) => textChangeHandler('description', text)}
            autoCapitalize='sentences'
            multiline={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
