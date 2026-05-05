import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "./productSlice";
import { RATING_OPTIONS } from "../../Constants/productConstants";

export default function RatingFilter() {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => state.products.filters);

    return (
        <div className="filter-group">
            <h3>Minimum Rating</h3>
            {RATING_OPTIONS.map((rating) => (
                <label key={rating}>
                    <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={currentFilters.rating === rating}
                        onChange={() => dispatch(setFilters({ rating }))}
                    />
                    {rating === 0 ? "All ratings" : `${rating}+ stars`}
                </label>
            ))}
        </div>
    );
}