import { createSelector, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkout, CartItems } from "../../app/api";
import { AppDispatch, RootState } from "../../app/store";

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';
export interface CartState {
  items: {[productId: string]: number};
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: CartState = {
  items: {},
  checkoutState: 'READY',
  errorMessage: ''
}

// create an action creator
export const checkoutCart = createAsyncThunk('cart/checkout',async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const items = state.cart.items;
  const response = await checkout(items);
  return response;
})
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items[id] ? state.items[id]++ : state.items[id] = 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(state, action: PayloadAction<{id: string, quantity: number}>) {
      const {id, quantity} = action.payload;
      state.items[id] = quantity;
    }
  },
  // createAsyncThunk creates below actions e.g. pending, fulfilled, rejected
  extraReducers: function(builder) {
    builder.addCase(checkoutCart.pending, (state) => {
      state.checkoutState = 'LOADING';
    })
    builder.addCase(checkoutCart.fulfilled, (state, action: PayloadAction<{success: boolean}>) => {
      const { success } = action.payload;
      if (success) {
        state.checkoutState = 'READY';
        state.items = {};
      } else {
        state.checkoutState = 'ERROR';
      }
      // state.checkoutState = 'READY';
    })
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = 'ERROR';
      state.errorMessage = action.error.message || '';
    })
  }
});

// export function checkout() {
//   return function checkoutThunk(dispatch: AppDispatch) {
//      dispatch({type: 'cart/checkout/pending'});
//      setTimeout(function () {
//        dispatch({type: 'cart/checkout/fulfilled'});
//      }, 500)
//   }
// }
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// selector function
export function getNumItems(state: RootState) {
  console.log('calling getNumItems');
  let numItems = 0;
  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }
  return numItems;
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  items => {
    console.log('calling getMemoizedNumItems');
    let numItems = 0
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
)

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      total += products[id].price * items[id];
    }
    // to round to nearest two decimal places
    return total.toFixed(2);
  }
)