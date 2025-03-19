import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity >= 1 ? item.quantity-- : 0;

      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const getTotalQuantity = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
};

export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
};

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
