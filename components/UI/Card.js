import React from 'react';
import { View, StyleSheet } from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

const Card = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
    shadowColor: colours.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: stylesConstants.elevation,
    borderRadius: stylesConstants.borderRadius,
  },
});

export default Card;
