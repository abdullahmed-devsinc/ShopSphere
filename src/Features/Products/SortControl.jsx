import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "./productSlice";
export default function SortControl() {
    const dispatch = useDispatch();
    const currentSort = useSelector((state) => state.products.sortBy)

    return (
        <div className="filter-group">
            <h3>Sort By</h3>
            <select value={currentSort} onChange={(e) => dispatch(setSortBy(e.target.value))}>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
            </select>
        </div>
    )
}