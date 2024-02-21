import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0, isUpdated: false },
  reducers: {
    addToCart: (state, action) => {
      state.isUpdated = true;
      const { pid, quantity, price, size, customisation } = action.payload;

      state.totalAmount += price * +quantity;

      // If customise, add to the array.
      if (customisation) {
        state.items.push({
          pid,
          quantity: +quantity,
          price,
          size,
          customisation,
        });
      } else {
        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.pid === pid && item.size === size && !item.customisation
        );
        const existingItem = state.items[existingItemIndex];

        if (existingItem) {
          state.items[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + +quantity,
          };
        } else {
          state.items.push({
            pid,
            quantity: +quantity,
            price,
            size,
            customisation,
          });
        }
      }
    },
    replaceCart: (state, action) => {
      const { items, totalAmount } = action.payload;
      state.items = items;
      state.totalAmount = totalAmount;
    },
    removeItem: (state, action) => {
      state.isUpdated = true;
      const item = action.payload;

      if (item.customisation) {
        const foundItemIndex = state.items.findIndex(
          (foundItem) =>
            item.pid === foundItem.pid &&
            item.size === foundItem.size &&
            item.customisation.name === foundItem.customisation?.name &&
            item.customisation.number === foundItem.customisation?.number
        );

        state.totalAmount -=
          state.items[foundItemIndex].price *
          state.items[foundItemIndex].quantity;

        state.items.splice(foundItemIndex, 1);
      } else {
        const foundItemIndex = state.items.findIndex(
          (foundItem) =>
            item.pid === foundItem.pid && item.size === foundItem.size
        );
        state.totalAmount -=
          state.items[foundItemIndex].price *
          state.items[foundItemIndex].quantity;

        state.items.splice(foundItemIndex, 1);
      }
    },
    changeQuantity: (state, action) => {
      state.isUpdated = true;
      const { item, newQuantity } = action.payload;

      if (item.customisation) {
        const foundItemIndex = state.items.findIndex(
          (foundItem) =>
            item.pid === foundItem.pid &&
            item.size === foundItem.size &&
            item.customisation.name === foundItem.customisation?.name &&
            item.customisation.number === foundItem.customisation?.number
        );
        state.totalAmount +=
          state.items[foundItemIndex].price *
          (+newQuantity - state.items[foundItemIndex].quantity);
        state.items[foundItemIndex] = { ...item, quantity: +newQuantity };
      } else {
        const foundItemIndex = state.items.findIndex(
          (foundItem) =>
            item.pid === foundItem.pid && item.size === foundItem.size
        );
        state.totalAmount +=
          state.items[foundItemIndex].price *
          (+newQuantity - state.items[foundItemIndex].quantity);
        state.items[foundItemIndex] = { ...item, quantity: +newQuantity };
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.isUpdated = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
