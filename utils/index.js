export const formatPrice = (string) => {
  return string.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
};
