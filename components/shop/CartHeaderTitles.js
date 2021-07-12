import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import stylesConstants from '../../constants/stylesConstants';

const CartHeaderTitles = ({ fromCart }) => {
  return (
    <View style={styles.tableHeader}>
      <Text style={{ ...styles.tableHeaderText, width: '55%' }}>Product</Text>
      <Text
        style={{
          ...styles.tableHeaderText,
          width: '15%',
          textAlign: 'right',
        }}
      >
        Quantity
      </Text>
      <Text
        style={{
          ...styles.tableHeaderText,
          width: '25%',
          textAlign: 'right',
        }}
      >
        Sub-Total
      </Text>
      {fromCart && <View style={styles.spacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: stylesConstants.margin,
    paddingHorizontal: stylesConstants.padding,
  },
  tableHeaderText: {
    fontFamily: 'open-sans',
    fontSize: 10,
  },
  spacer: {
    width: '5%',
  },
});

export default CartHeaderTitles;
