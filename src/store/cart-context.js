import React from "react";

// To provide the inners of obj here is optional, it will just help later when you type it and expect some helpers
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
