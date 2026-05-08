import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from './productSlice';
import { SORT_OPTIONS } from '../../Constants/productConstants';

export default function SortControl() {
  const dispatch = useDispatch();
  const currentSort = useSelector((state) => state.products.sortBy);

  return (
    <div className='filter-group'>
      <h3>Sort By</h3>
      <select value={currentSort} onChange={(e) => dispatch(setSortBy(e.target.value))}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
