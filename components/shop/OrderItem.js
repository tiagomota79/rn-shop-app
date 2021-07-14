import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';

// Components
import CartItem from './CartItem';
import Card from '../UI/Card';

// Constants
import colours from '../../constants/colours';
import stylesConstants from '../../constants/stylesConstants';

// Utils
import { formatDate, formatPrice } from '../../utils';
import CartHeaderTitles from './CartHeaderTitles';

const OrderItem = ({ orderData }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.container}>
      <View style={styles.orderSummary}>
        <Text style={styles.totalAmount}>
          {Platform.OS === 'ios'
            ? formatPrice(orderData.totalAmount)
            : `$${orderData.totalAmount.toFixed(2)}`}
        </Text>
        <Text style={styles.date}>{formatDate(new Date(orderData.date))}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide details' : 'Show Details'}
        onPress={() => setShowDetails((prevState) => !prevState)}
        color={colours.primary}
      />
      {showDetails && (
        <View style={styles.detailsContainer}>
          <CartHeaderTitles />
          <View>
            {orderData.items.map((item) => (
              <CartItem key={item.id} productData={item} />
            ))}
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: stylesConstants.margin,
    padding: stylesConstants.padding,
    alignItems: 'center',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: stylesConstants.margin,
  },
  totalAmount: {
    color: colours.priceColour,
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  detailsContainer: {
    alignItems: 'center',
    margin: stylesConstants.margin / 2,
  },
});

export default OrderItem;
