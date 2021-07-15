import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import UserInput from '../../components/UI/UserInput';
import Card from '../../components/UI/Card';
import CardButtons from '../../components/UI/CardButtons';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

const AuthScreen = () => {
  const signUpHandler = () => {};

  const loginHandler = () => {};

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
        <Card style={styles.container}>
          <ScrollView>
            <UserInput
              id='email'
              label='E-mail'
              keyboartType='email-address'
              autoCapitalize='none'
              onChangeText={() => {}}
              initialValue=''
              required
            />
            <UserInput
              id='password'
              label='Password'
              keyboartType='default'
              secureTextEntry
              minLength={5}
              autoCapitalize='none'
              onChangeText={() => {}}
              initialValue=''
              required
            />
            <CardButtons
              leftTitle={'Sign Up'}
              onLeftButton={signUpHandler}
              leftButtonColour={colours.accent}
              rightTitle={'Login'}
              onRightButton={loginHandler}
              style={styles.buttonsContainer}
            />
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
});

export default AuthScreen;
