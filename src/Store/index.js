import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '../Features/Cart/CartSlice'
import wishlistReducer from '../Features/WishList/WishListSlice'
import productsReducer from '../Features/Products/ProductSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productsReducer
    },
    preLoadedState
})
store.subscribe(() => {
    const { cart, wishlist } = store.getState();
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
})
const preLoadedState = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? { items: [] },
    wishlist: JSON.parse(localStorage.getItem('wishlist')) ?? { items: [] },
}