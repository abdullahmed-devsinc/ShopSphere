export const PRODUCT_CATEGORIES = [
  'all',
  'electronics',
  'home',
  'fashion',
  'grocery',
  'books',
  'sports',
  'beauty',
];

export const ADD_PRODUCT_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => c !== 'all');

export const FILTER_DEFAULTS = {
  category: 'all',
  priceRange: [0, null],
  rating: 0,
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
];

export const RATING_OPTIONS = [0, 1, 2, 3, 4, 5];
export const REVIEW_RATING_OPTIONS = [5, 4, 3, 2, 1];
