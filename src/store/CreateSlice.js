import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// console.log(fetchproduct.data, "jkkkkkkkk");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    wishlist: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      console.log(action.payload.id, action.payload, "action");
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        // console.log(action.payload, "sliceCart");
      }
      // console.log(action.payload, "payyyyyyyyy");
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    addproduct: (state, action) => {
      state.cart.push(action.payload);

      console.log(action.payload, "payload product");
    },
    decrementQuantity: (state, action, index) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        if (item.quantity === 1) {
          state.cart.splice(itemIndex, 1);
        } else {
          item.quantity--;
        }
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );

      // console.log(action.payload, "actionpay");
    },
    addtopeoducts: (state, action) => {
      const addwishlist = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (addwishlist) {
        addwishlist.quantity++;
      } else {
        state.wishlist.push({ ...action.payload });
        console.log(action.payload, "actionwishlist");
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchproduct.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchproduct.fulfilled, (state, action) => {
  //       state.product = action.payload;
  //     })
  //     .addCase(fetchproduct.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addtopeoducts,
  filter,
} = cartSlice.actions;
// export const selectProducts = (state) => state.cart.product;
