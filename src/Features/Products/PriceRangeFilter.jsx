import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useId } from "react";
import { setFilters } from "./productSlice";
const MIN_PRICE = 0
const MAX_PRICE = 500
export default function PriceRangeFilter() {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => state.products.filters)
    const [minVal, setMinVal] = useState(currentFilters.priceRange[0])
    const [maxVal, setMaxVal] = useState(currentFilters.priceRange[1])
    const [noMaxLimit, setNoMaxLimit] = useState(currentFilters.priceRange[1] >= MAX_PRICE)
    const gradientId = `price-range-track-${useId().replace(/:/g, "")}`

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

    const minPct = ((minVal - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    const maxPct = ((effectiveMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    const maxPctVisual = noMaxLimit ? 100 : maxPct

    return (
        <div className="filter-group">
            <h3>Price Range</h3>

            <div className="price-range-display">
                <span className="price-range-val">${minVal}</span>
                <span className="price-range-sep">—</span>
                <span className="price-range-val">
                    {noMaxLimit ? "Any" : `$${maxVal}`}
                </span>
            </div>

            <div className="price-slider-wrap">
                <svg
                    className="price-slider-track"
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                    aria-hidden
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="price-slider-stop price-slider-stop--muted" />
                            <stop offset={`${minPct}%`} className="price-slider-stop price-slider-stop--muted" />
                            <stop offset={`${minPct}%`} className="price-slider-stop price-slider-stop--accent" />
                            <stop offset={`${maxPctVisual}%`} className="price-slider-stop price-slider-stop--accent" />
                            <stop offset={`${maxPctVisual}%`} className="price-slider-stop price-slider-stop--muted" />
                            <stop offset="100%" className="price-slider-stop price-slider-stop--muted" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="4" rx="2" ry="2" fill={`url(#${gradientId})`} />
                </svg>
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
