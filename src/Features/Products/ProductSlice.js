import { createSelector, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    items: [],
    filters: { category: 'all', priceRange: [0, 1000], rating: 0 },
    sortBy: 'newest',
    searchBy: '',

}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchBy = action.payload
        },
        setFitlers(state, action) {
            state.filters = { ...state.filters, ...action.payload }
        },
        setSortBy(state, action) {
            state.sortBy = action.payload
        },
        addProduct(state, action) {
            state.items.push(action.payload)
        }
    }

})

export const { setFitlers, setSearchQuery, setSortBy, addProduct } = productsSlice.actions;
export default productsSlice.reducer

const selectAllProducts = (state) => state.products.items
const selectSearchQuery = (state) => state.products.searchBy
const selectFilters = (state) => state.products.filters
const selectSortBy = (state) => state.products.sortBy

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
            result = result.filter(p => p.rating === filters.rating)
        }
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
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