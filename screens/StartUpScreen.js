import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// Constants
import colours from '../constants/colours';

// Slices
import { loginAction } from '../slices/authSlice';

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        navigation.navigate('Auth');
        return;
      }

      const transformedData = JSON.parse(userData);
      const {
        idToken,
        email,
        refreshToken,
        expirationTimeString,
        localId,
        registered,
        displayName,
      } = transformedData;

      const expirationDate = new Date(expirationTimeString);
      if (expirationDate <= new Date() || !idToken || !localId) {
        navigation.navigate('Auth');
        return;
      }

      navigation.navigate('Shop');
      dispatch(
        loginAction({
          idToken,
          email,
          refreshToken,
          expirationDate,
          localId,
          registered,
          displayName,
        })
      );
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colours.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartUpScreen;
