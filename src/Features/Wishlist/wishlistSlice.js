import { createSlice, createSelector } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addTowishlist(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (!existing) {
        state.items.push(action.payload);
      }
    },
    removeFromwishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist(state){
      state.items = [];
    }
  },
});
export const { addTowishlist, removeFromwishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state) => state.wishlist.items;

export const selectIsInwishlist = (productId) =>
  createSelector(selectWishlistItems, (items) =>
    items.some((item) => item.id === productId),
  );
export const selectwishlistCount = createSelector(
  selectWishlistItems,
  (items) => items.length,
);
