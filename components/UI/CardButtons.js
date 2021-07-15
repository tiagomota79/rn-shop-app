import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

const CardButtons = ({
  leftTitle,
  onLeftButton,
  leftButtonColour,
  rightTitle,
  onRightButton,
  rightButtonColour,
  style,
}) => {
  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <Button
        title={leftTitle}
        onPress={onLeftButton}
        color={leftButtonColour || colours.primary}
      />
      <Button
        title={rightTitle}
        onPress={onRightButton}
        color={rightButtonColour || colours.primary}
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

export default CardButtons;
