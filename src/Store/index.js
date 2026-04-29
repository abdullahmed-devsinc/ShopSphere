import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Features/Cart/cartSlice'
import wishlistReducer from '../Features/Wishlist/wishlistSlice'
import productsReducer from '../Features/Products/productSlice'
import products from '../data/product.json'

const defaultProductsState = {
    items: products,
    filters: { category: 'all', priceRange: [0, 1000], rating: 0 },
    sortBy: "newest",
    searchBy: "",
}

const presistedProducts = JSON.parse(localStorage.getItem("products") || "null")

const preloadedState = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? { items: [] },
    wishlist: JSON.parse(localStorage.getItem('wishlist')) ?? { items: [] },
    products: presistedProducts ? {
        ...defaultProductsState,
        ...presistedProducts,
        filters: {
            ...defaultProductsState.filters,
            ...(presistedProducts.filters || {})
        }
    } : defaultProductsState
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
    const { cart, wishlist, products } = store.getState();
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    localStorage.setItem('products', JSON.stringify(products))
})
