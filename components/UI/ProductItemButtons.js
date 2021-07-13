import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

const ProductItemButtons = ({
  leftTitle,
  onLeftButton,
  rightTitle,
  onRightButton,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={leftTitle}
        onPress={onLeftButton}
        color={colours.primary}
      />
      <Button
        title={rightTitle}
        onPress={onRightButton}
        color={colours.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: stylesConstants.padding * 2,
  },
});

export default ProductItemButtons;
