import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

const UserInput = (props) => {
  const { label, style } = props;

  return (
    <View style={{ ...styles.formControl, ...style }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default UserInput;
