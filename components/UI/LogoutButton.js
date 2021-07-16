import React from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

// Constants
import colours from '../../constants/colours';

// Slices
import { logoutAction } from '../../slices/authSlice';

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <Button
          title='Logout'
          color={colours.primary}
          onPress={() => {
            dispatch(logoutAction());
            navigation.navigate('Auth');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LogoutButton;
