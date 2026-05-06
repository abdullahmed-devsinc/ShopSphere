import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./productSlice";
import { PRICE_RANGE_MAX } from "../../Constants/productConstants";

export default function PriceRangeFilter() {
    const dispatch = useDispatch();
    const { priceRange } = useSelector((state) => state.products.filters);
    const [minVal, maxVal] = priceRange;
    const noMaxLimit = maxVal === PRICE_RANGE_MAX;

    const applyPriceRange = (nextMin, nextMax = PRICE_RANGE_MAX) => {
        dispatch(setFilters({ priceRange: [nextMin, nextMax] }));
    };

    const handleMinChange = (e) => {
        const upperBound = noMaxLimit ? PRICE_RANGE_MAX : maxVal;
        const nextMin = Math.max(
            0,
            Math.min(Number(e.target.value), upperBound - 1)
        );
        const nextMax = noMaxLimit ? PRICE_RANGE_MAX : upperBound;
        applyPriceRange(nextMin, nextMax);
    };

    const handleMaxChange = (e) => {
        const nextMax = Math.max(Number(e.target.value), minVal + 1);
        applyPriceRange(minVal, nextMax);
    };

    const handleNoMaxToggle = () => {
        const boundedMax = Math.min(PRICE_RANGE_MAX, Math.max(minVal + 1, 1));
        applyPriceRange(minVal, noMaxLimit ? boundedMax : PRICE_RANGE_MAX);
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
                    value={noMaxLimit ? PRICE_RANGE_MAX : maxVal}
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