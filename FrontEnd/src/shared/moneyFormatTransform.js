export const maskCurrency = (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{3})$/, '$1 $2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ' ');
  e.target.value = value;
  return e;
};


export const transformCost = (cost) => {
  let formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'CRC',
  });
  return formatter.format(cost);
};