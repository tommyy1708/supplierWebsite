import React from 'react';

const CheckOutContent = React.createContext({
  cartData: [
    {
      orderNumber: `OD+${new Date()}`,
      items: [],
      date: new Date(),
      client: '',
      discount: 0,
      amount: 0,
      tax: 0,
      total: 0,
    },
  ],
  productsData: [
    {
      key: '',
      item_code: '',
      usc: '',
      item: '',
      qty: 0,
      msrp: 0,
      cost: 0,
      category: '',
    },
  ],
  addItemToCart: () => {},
  subItemToCart: () => {},
});

export default CheckOutContent;
