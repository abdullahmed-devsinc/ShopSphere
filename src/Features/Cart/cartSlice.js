import { createSlice, createSelector } from '@reduxjs/toolkit'
const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existing = state.items.find((i) => i.id === action.payload.id)
            if (existing) {
                if (existing.quantity < existing.stock) {
                    existing.quantity += 1
                }
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload)
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload
            const item = state.items.find((i) => i.id == id)
            if (item) {
                item.quantity = Math.min(quantity, item.stock) > 0 ? Math.min(quantity, item.stock) : 1
            }
        },
        clearCart(state) {
            state.items = []
        }
    }
})
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer;


// selectors
const selectCartItems = state => state.cart.items

export const selectCartCount = createSelector(

    selectCartItems,
    (items) => items.reduce((total, item) => total + item.quantity, 0)
)
export const selectCartSubTotal = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + (item.quantity * item.price), 0)
)
export const selectIsInCart = (productId) => createSelector(
    selectCartItems,
    (items) => items.some(item => item.id === productId)

)