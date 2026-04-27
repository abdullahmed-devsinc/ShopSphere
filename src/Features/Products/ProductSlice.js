import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        filters: { category: 'all', priceRange: [0, 1000], rating: 0 },
        sortBy: 'newest',
        searchBy: ''
    }
}
)