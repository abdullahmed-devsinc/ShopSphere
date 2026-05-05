import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import wishlistReducer from "../Features/Wishlist/wishlistSlice";
import productsReducer from "../Features/Products/productSlice";
import products from "../data/product.json";
import { FILTER_DEFAULTS } from "../Constants/productConstants";
import { loadState, saveState } from "../utils/storage";

const defaultProductsState = {
    items: products,
    filters: FILTER_DEFAULTS,
    sortBy: "newest",
    searchBy: "",
};

const persistedProducts = loadState("products", null);

const preloadedState = {
    cart: loadState("cart", { items: [] }),
    wishlist: loadState("wishlist", { items: [] }),
    products: persistedProducts
        ? {
            ...defaultProductsState,
            ...persistedProducts,
            filters: {
                ...defaultProductsState.filters,
                ...(persistedProducts.filters || {}),
            },
        }
        : defaultProductsState,
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productsReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    const { cart, wishlist, products: productState } = store.getState();
    saveState("cart", cart);
    saveState("wishlist", wishlist);
    saveState("products", productState);
});