import cartItems from "@/app/cartItems";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import cartItems from

interface data {
  id: string;
  title: string;
  price: number;
  img: string;
  amount: number;
}

interface cartItems {
  cartItems: data[];
  amount: number;
  total: number;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: cartItems = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // Remove the item if its already in the  cart
        state.cartItems.splice(existingItemIndex, 1);
      } else {
        // If it's a new item, add it to the cart
        state.cartItems.push({ ...newItem, amount: 1 });
      }
      // Update the cart totals
      state.amount = state.cartItems.reduce(
        (total, item) => total + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (total, item) => total + item.amount * item.price,
        0
      );
    },

    // Clear the cart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // remove item from cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // increment cart item
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      //   cartItem.amount = cartItem.amount + 1;
      if (cartItem) {
        cartItem.amount += 1;
      }
    },

    // decrease cart item
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      //   cartItem.amount = cartItem.amount - 1;
      if (cartItem) {
        cartItem.amount -= 1;
      }
    },

    // calculate total amount
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  addToCart,
  clearCart,
  increase,
  decrease,
  calculateTotals,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
