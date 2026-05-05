import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setFilters } from "./productSlice";
const MIN_PRICE = 0
const MAX_PRICE = 500
export default function PriceRangeFilter() {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => state.products.filters)
    const [minVal, setMinVal] = useState(currentFilters.priceRange[0])
    const [maxVal, setMaxVal] = useState(currentFilters.priceRange[1])
    const [noMaxLimit, setNoMaxLimit] = useState(currentFilters.priceRange[1] >= MAX_PRICE)

    // Keep local state in sync if filters are reset externally
    useEffect(() => {
        setMinVal(currentFilters.priceRange[0])
        setMaxVal(currentFilters.priceRange[1])
        setNoMaxLimit(currentFilters.priceRange[1] >= MAX_PRICE)
    }, [currentFilters.priceRange[0], currentFilters.priceRange[1]])

    const effectiveMax = noMaxLimit ? MAX_PRICE : maxVal

    const handleMinChange = (e) => {
        const val = Math.min(+e.target.value, effectiveMax - 1)
        setMinVal(val)
        dispatch(setFilters({ priceRange: [val, noMaxLimit ? MAX_PRICE : effectiveMax] }))
    }

    const handleMaxChange = (e) => {
        const val = Math.max(+e.target.value, minVal + 1)
        setMaxVal(val)
        dispatch(setFilters({ priceRange: [minVal, val] }))
    }

    const handleNoMaxToggle = () => {
        const next = !noMaxLimit
        setNoMaxLimit(next)
        dispatch(setFilters({ priceRange: [minVal, next ? MAX_PRICE : maxVal] }))
    }



    // Derived track fill percentages
    const minPct = ((minVal - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    const maxPct = ((effectiveMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

    return (
        <div className="filter-group">
            <h3>Price Range</h3>

            {/* Price display */}
            <div className="price-range-display">
                <span className="price-range-val">${minVal}</span>
                <span className="price-range-sep">—</span>
                <span className="price-range-val">
                    {noMaxLimit ? "Any" : `$${maxVal}`}
                </span>
            </div>

            {/* Dual range slider */}
            <div className="price-slider-wrap">
                <div
                    className="price-slider-track"
                    style={{
                        background: `linear-gradient(to right,
                                        var(--border) ${minPct}%,
                                        var(--accent) ${minPct}%,
                                        var(--accent) ${noMaxLimit ? 100 : maxPct}%,
                                        var(--border) ${noMaxLimit ? 100 : maxPct}%)`
                    }}
                />
                <input
                    type="range"
                    className="price-slider price-slider--min"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={minVal}
                    onChange={handleMinChange}
                />
                {!noMaxLimit && (
                    <input
                        type="range"
                        className="price-slider price-slider--max"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={maxVal}
                        onChange={handleMaxChange}
                    />
                )}
            </div>

            {/* No max limit toggle */}
            <label className="price-no-limit">
                <input
                    type="checkbox"
                    checked={noMaxLimit}
                    onChange={handleNoMaxToggle}
                />
                No maximum price
            </label>
        </div>

    )
}