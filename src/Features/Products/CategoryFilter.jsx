import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "./productSlice";
export default function CategoryFilter() {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => state.products.filters)

    return (
        <div className="filter-group">
            <h3>Category</h3>
            {['all', 'electronics', 'home', 'fashion', 'grocery', 'books', 'sports', 'beauty'].map(cat => (
                <label key={cat}>
                    <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={currentFilters.category === cat}
                        onChange={() => dispatch(setFilters({ category: cat }))}
                    />
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
            ))}
        </div>
    )
}