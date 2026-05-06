import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./productSlice";

export default function PriceRangeFilter() {
    const dispatch = useDispatch();
    const { priceRange } = useSelector((state) => state.products.filters);
    const [minVal, maxVal] = priceRange;
    const noMaxLimit = maxVal == null;

    const applyPriceRange = (nextMin, nextMax = null) => {
        dispatch(setFilters({ priceRange: [nextMin, nextMax] }));
    };

    const handleMinChange = (e) => {
        const upperBound = noMaxLimit ? Number.POSITIVE_INFINITY : maxVal;
        const nextMin = Math.max(
            0,
            Math.min(Number(e.target.value), upperBound - 1)
        );
        const nextMax = noMaxLimit ? null : upperBound;
        applyPriceRange(nextMin, nextMax);
    };

    const handleMaxChange = (e) => {
        const nextMax = Math.max(Number(e.target.value), minVal + 1);
        applyPriceRange(minVal, nextMax);
    };

    const handleNoMaxToggle = () => {
        applyPriceRange(minVal, noMaxLimit ? minVal + 1 : null);
    };

    return (
        <div className="filter-group">
            <h3>Price Range</h3>

            <div className="price-range-display">
                <span className="price-range-val">${minVal}</span>
                <span className="price-range-sep">—</span>
                <span className="price-range-val">{noMaxLimit ? "Any" : `$${maxVal}`}</span>
            </div>

            <div className="price-inputs">
                <input
                    type="number"
                    min={0}
                    value={minVal}
                    onChange={handleMinChange}
                    aria-label="Minimum price"
                />
                <span>to</span>
                <input
                    type="number"
                    onChange={handleMaxChange}
                    disabled={noMaxLimit}
                    aria-label="Maximum price"
                />
            </div>

            <label className="price-no-limit">
                <input type="checkbox" checked={noMaxLimit} onChange={handleNoMaxToggle} />
                No maximum price
            </label>
        </div>
    );
}