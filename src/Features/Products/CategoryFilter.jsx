import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from './productSlice';
import { PRODUCT_CATEGORIES } from '../../Constants/productConstants';

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.products.filters);

  return (
    <div className='filter-group'>
      <h3>Category</h3>
      {PRODUCT_CATEGORIES.map((cat) => (
        <label key={cat}>
          <input
            type='radio'
            name='category'
            value={cat}
            checked={currentFilters.category === cat}
            onChange={() => dispatch(setFilters({ category: cat }))}
            className='app-input'
          />
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
      ))}
    </div>
  );
}
