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
