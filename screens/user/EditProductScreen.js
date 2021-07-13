import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
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

const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedValues = {
      ...state.inputValue,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }

    return {
      ...state,
      inputValue: updatedValues,
      inputValidities: updatedValidities,
      formIsValid,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation }) => {
  // const [title, setTitle] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState('');

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

  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check for errors in the form.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (productData) {
      dispatch(
        updateProduct({
          id: productData.id,
          title: formState.inputValue.title,
          imageUrl: formState.inputValue.imageUrl,
          description: formState.inputValue.description,
        })
      );
    } else {
      dispatch(
        createProduct({
          title: formState.inputValue.title,
          imageUrl: formState.inputValue.imageUrl,
          price: +formState.inputValue.price,
          description: formState.inputValue.description,
        })
      );
    }
    navigation.goBack();
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

  return (
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
