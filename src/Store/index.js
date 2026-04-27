import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Features/Cart/CartSlice'
import wishlistReducer from '../Features/wishlist/wishlistSlice'
import productsReducer from '../Features/Products/ProductSlice'

const preloadedState = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? { items: [] },
    wishlist: JSON.parse(localStorage.getItem('wishlist')) ?? { items: [] },
}
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productsReducer
    },
    preloadedState
})
store.subscribe(() => {
    const { cart, wishlist } = store.getState();
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
})
