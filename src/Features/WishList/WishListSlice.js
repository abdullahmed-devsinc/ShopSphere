import { createSlice, createReducer, createSelector } from "@reduxjs/toolkit";
const initialState = {
    items: []
}

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishList(state, action) {
            const existing = state.items.find(item => item.id === action.payload.id)
            if (!existing) {
                state.items.push(action.payload)
            }
        },
        removeFromWishList(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        }
    }
})
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;

const selectWishlistItems = state => state.wishlist.items;

export const selectIsInWishList = (productId) => createSelector(
    selectWishlistItems,
    (items) => items.some(item => item.id === productId)
)
export const selectWishlistCount = createSelector(
    selectWishlistItems,
    (items) => items.length
)