import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import productData from '../../data/product.json';
import { getAverageRating } from '../../utils/productRating';
import { FILTER_DEFAULTS } from '../../Constants/productConstants';

const initialState = {
  items: productData,
  filters: FILTER_DEFAULTS,
  sortBy: 'newest',
  searchBy: '',
};

const productsSlice = createSlice({
  name: 'products',
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
      state.items.push({
        ...action.payload,
        id: nextId,
      });
    },
    addReview(state, action) {
      const { productId, review } = action.payload;
      const product = state.items.find((i) => i.id === productId);

      product.reviews.unshift({
        id: nanoid(),
        author: review.author.trim(),
        rating: review.rating,
        createdAt: new Date().toISOString(),
      });
    },
    resetFilters(state) {
      state.searchBy = '';
      state.filters = FILTER_DEFAULTS;
    },
  },
});

export const {
  setFilters,
  setSearchQuery,
  setSortBy,
  addProduct,
  addReview,
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;

const selectAllProducts = (state) => state.products.items;
const selectSearchQuery = (state) => state.products.searchBy;
const selectFilters = (state) => state.products.filters;
const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = (productId) =>
  createSelector(selectAllProducts, (items) => {
    const product = items.find((p) => p.id === productId);

    return product;
  });

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSearchQuery,
  selectFilters,
  selectSortBy,
  (items, searchQuery, filters, sortBy) => {
    const query = searchQuery.trim().toLowerCase();
    const [minPrice, maxPrice] = filters.priceRange;

    let result = items.filter((product) => {
      const matchesSearch = !query || product.name.toLowerCase().includes(query);
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;

      const matchesRating =
        filters.rating <= 0 || (getAverageRating(product) ?? 0) >= filters.rating;

      const matchesPrice =
        product.price >= minPrice && (maxPrice == null || product.price <= maxPrice);
      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    });
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price = b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        result.sort((a, b) => (getAverageRating(b) ?? 0) - (getAverageRating(a) ?? 0));
        break;
      default:
        break;
    }
    return result;
  },
);
export const selectTopRatedProducts = createSelector(selectAllProducts, (products) => {
  const withRatings = products.filter((p) => getAverageRating(p) != null);
  return withRatings.sort((a, b) => getAverageRating(b) - getAverageRating(a));
});
export const selectSimilarProducts = (productId, category, limit = 12) =>
  createSelector(selectAllProducts, (items) =>
    items.filter((p) => p.category === category && p.id !== productId).slice(0, limit),
  );
