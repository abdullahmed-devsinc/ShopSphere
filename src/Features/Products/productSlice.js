import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import productData from "../../data/product.json";
import { getAverageRating } from "../../utils/productRating";
import { FILTER_DEFAULTS } from "../../Constants/productConstants";

const initialState = {
    items: productData,
    filters: FILTER_DEFAULTS,
    sortBy: "newest",
    searchBy: "",
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchBy = action.payload;
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        addProduct(state, action) {
            const nextId =
                state.items.length > 0
                    ? Math.max(...state.items.map((item) => Number(item.id))) + 1
                    : 1;

            const { rating: _dropRating, ...payload } = action.payload;
            state.items.push({
                ...payload,
                id: nextId,
                reviews: Array.isArray(payload.reviews) ? payload.reviews : [],
            });
        },
        addReview(state, action) {
            const { productId, review } = action.payload;
            const product = state.items.find((i) => i.id === productId);
            if (!product) return;
            if (!Array.isArray(product.reviews)) product.reviews = [];

            product.reviews.unshift({
                id: nanoid(),
                author: review.author.trim(),
                rating: review.rating,
                createdAt: new Date().toISOString(),
            });
        },
        resetFilters(state) {
            state.searchBy = "";
            state.filters = FILTER_DEFAULTS;
        },
    },
});

export const { setFilters, setSearchQuery, setSortBy, addProduct, addReview, resetFilters } =
    productsSlice.actions;
export default productsSlice.reducer;

const selectAllProducts = (state) => state.products.items
const selectSearchQuery = (state) => state.products.searchBy
const selectFilters = (state) => state.products.filters
const selectSortBy = (state) => state.products.sortBy

export const selectStock = (productId) => createSelector(
    selectAllProducts,
    (items) => {
        const product = items.find(p => p.id === productId);
        return product ? product.stock : 0
    }
)
export const selectProductById = (productId) => createSelector(
    selectAllProducts,
    (items) => {
        const product = items.find(p => p.id === productId)
        return product
    }
)
export const selectFilteredProducts = createSelector(
    selectAllProducts,
    selectSearchQuery,
    selectFilters,
    selectSortBy,
    (items, searchQuery, filters, sortBy) => {
        let result = [...items]
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        if (filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category)
        }
        if (filters.rating > 0) {
            result = result.filter((p) => (getAverageRating(p) ?? 0) >= filters.rating)
        }
        const [minPrice, maxPrice] = filters.priceRange;
        result = result.filter((p) =>
            p.price >= minPrice && (maxPrice == null || p.price <= maxPrice)
        )
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price)
        }
        if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price)
        }
        if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name))
        }
        return result
    }
)
export const selectSimilarProducts = (productId, category, limit = 12) =>
    createSelector(selectAllProducts, (items) =>
        items
            .filter((p) => p.category === category && p.id !== productId)
            .slice(0, limit)
    )