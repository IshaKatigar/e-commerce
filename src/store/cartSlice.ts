import { createSlice } from "@reduxjs/toolkit";

import { ProductListI } from "pages/products/interfaces";

type InitialStateI = {
  cartItems: (ProductListI & { quantity: number })[];
  totalAmount: number;
};

// Load cart from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : { cartItems: [], totalAmount: 0 };
};

const initialState: InitialStateI = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state)); // save to the local storage
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state)); // save to the local storage
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cart"); // remove from the local storage
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
