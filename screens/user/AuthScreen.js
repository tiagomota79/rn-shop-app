import React, { useState, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import validator from 'validator';

// Components
import UserInput from '../../components/UI/UserInput';
import Card from '../../components/UI/Card';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Slice
import { selectAuthState, signup } from '../../slices/authSlice';

// Utils
import { formReducer } from '../../utils';

export const modes = {
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
};

const AuthScreen = () => {
  const [mode, setMode] = useState(modes.LOGIN);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);

  if (authState.email) {
    console.log('authState', authState);
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const textChangeHandler = useCallback(
    (input, text) => {
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
    },
    [dispatchFormState]
  );

  const handleSignup = () => {
    if (isValidPassword && isValidEmail) {
      const { email, password } = formState.inputValue;

      dispatch(signup({ email, password }));
      console.log('Sign Up dispatched', { email, password });
      Alert.alert('You are all set!', 'Enter your credentials to login now', [
        { text: 'OK' },
      ]);
      return setMode(modes.LOGIN);
    }

    return Alert.alert('Errors on form', 'Please check your form for errors', [
      { text: 'OK' },
    ]);
  };

  const handleLogin = () => {};

  const handleSwitchMode = () => {
    mode === modes.LOGIN ? setMode(modes.SIGNUP) : setMode(modes.LOGIN);
    textChangeHandler('email', '');
    textChangeHandler('password', '');
  };

  const handleEndEditingPassword = () => {
    if (mode === modes.SIGNUP) {
      setIsValidPassword(
        validator.isLength(formState.inputValue.password, {
          min: 6,
          max: undefined,
        })
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={25}
    >
      <LinearGradient
        colors={[colours.ultraLightPink, colours.lightPink]}
        style={styles.gradient}
      >
        <Card
          style={{
            ...styles.container,
            backgroundColor:
              mode === modes.LOGIN ? colours.white : colours.lightAccent,
          }}
        >
          <ScrollView>
            <Text style={styles.title}>{mode}</Text>
            <UserInput
              label='E-mail'
              keyboartType='email-address'
              autoCapitalize='none'
              onChangeText={(text) => textChangeHandler('email', text)}
              value={formState.inputValue.email}
              required
              onEndEditing={() =>
                setIsValidEmail(validator.isEmail(formState.inputValue.email))
              }
            />
            {!isValidEmail && (
              <Text style={styles.text}>Please enter a valid email</Text>
            )}
            <UserInput
              label='Password'
              keyboartType='default'
              secureTextEntry
              minLength={5}
              autoCapitalize='none'
              onChangeText={(text) => textChangeHandler('password', text)}
              value={formState.inputValue.password}
              required
              onEndEditing={handleEndEditingPassword}
            />
            {!isValidPassword && (
              <Text style={styles.text}>
                Password must be 6 characters or more
              </Text>
            )}
            <View style={styles.buttonsContainer}>
              <Button
                title={mode === modes.LOGIN ? modes.LOGIN : 'Sign Up'}
                onPress={mode === modes.LOGIN ? handleLogin : handleSignup}
                color={colours.primary}
              />
            </View>
            <Text style={styles.text}>
              {mode === modes.LOGIN
                ? `Don't have an account? Sign up!`
                : `Already have an account? Login!`}
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title={
                  mode === modes.LOGIN ? 'Switch to Sign Up' : 'Switch to Login'
                }
                onPress={handleSwitchMode}
                color={colours.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Login',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: stylesConstants.padding * 2,
  },
  buttonsContainer: {
    margin: stylesConstants.margin / 2,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
});

export default AuthScreen;
