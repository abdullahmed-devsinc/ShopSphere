import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import productData from "../../data/product.json"

const initialFilters = { category: 'all', priceRange: [0, 1000], rating: 0 }
const initialState = {
    items: productData,
    filters: initialFilters,
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
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload }
        },
        setSortBy(state, action) {
            state.sortBy = action.payload
        },
        addProduct: {
            reducer(state, action) {
                const nextId = state.items.length > 0 ?
                    Math.max(...state.items.map(item => Number(item.id))) + 1 : 1;
                state.items.push({ id: nextId, ...action.payload })
            },
            // prepare(productData) {
            //     return {
            //         payload: {
            //             id: nanoid(),
            //             ...productData
            //         }
            //     }
        },
        increaseStock(state, action) {
            const existing = state.items.find((i) => i.id === action.payload.id)
            if (existing) {
                existing.stock += 1
            }
        },
        decreaseStock(state, action) {
            const existing = state.items.find((i) => i.id === action.payload.id)
            if (existing) {
                existing.stock -= 1
            }
        },
        resetFilters(state) {
            state.searchBy = ''
            state.filters = initialFilters
            state.searchBy = ''

        }
    }

})

export const { setFilters, setSearchQuery, setSortBy, addProduct, resetFilters } = productsSlice.actions;
export default productsSlice.reducer

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
            result = result.filter(p => p.rating >= filters.rating)
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