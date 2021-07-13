import format from 'date-fns/format';

export const formatPrice = (string) => {
  return string.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
};

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd, HH:mm');
};

export const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedValues = {
      ...state.inputValue,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }

    return {
      ...state,
      inputValue: updatedValues,
      inputValidities: updatedValidities,
      formIsValid,
    };
  }
  return state;
};

export const objectOfCartsToArray = (cartItems) => {
  const arrayOfCartItems = [];

  for (const key in cartItems) {
    arrayOfCartItems.push({
      id: key,
      productTitle: cartItems[key].productTitle,
      productPrice: cartItems[key].productPrice,
      quantity: cartItems[key].quantity,
      sum: cartItems[key].sum,
    });
  }

  return arrayOfCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
};
