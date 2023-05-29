import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      // to check if the item is already available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          description: newItem.description,
          imageSrc: newItem.imageSrc,
          imageAlt: newItem.imageAlt,
        });
        state.totalQuantity++;
      }
    },
    changeQuantity(state, action) {
      const existingItem = state.itemsList.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;

      const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, replaceData, removeFromCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
