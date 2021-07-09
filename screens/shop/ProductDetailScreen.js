import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the ProductDetailScreen component!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailScreen;
