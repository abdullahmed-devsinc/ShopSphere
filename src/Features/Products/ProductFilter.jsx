import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilters, setSortBy, resetFilters } from "../../Features/Products/productSlice"
import Button from "../../Components/Button"

const MIN_PRICE = 0
const MAX_PRICE = 500

export default function ProductFilter() {
    const dispatch = useDispatch()
    const currentFilters = useSelector((state) => state.products.filters)
    const currentSort = useSelector((state) => state.products.sortBy)

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

    const handleReset = () => {
        dispatch(resetFilters())
        setMinVal(MIN_PRICE)
        setMaxVal(MAX_PRICE)
        setNoMaxLimit(true)
    }

    // Derived track fill percentages
    const minPct = ((minVal - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    const maxPct = ((effectiveMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

    return (
        <div className="product-filters">

            <div className="filter-group">
                <h3>Sort By</h3>
                <select value={currentSort} onChange={(e) => dispatch(setSortBy(e.target.value))}>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name</option>
                </select>
            </div>

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

            <div className="filter-group">
                <h3>Minimum Rating</h3>
                {[0, 3, 4, 5].map(rating => (
                    <label key={rating}>
                        <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={currentFilters.rating === rating}
                            onChange={() => dispatch(setFilters({ rating: rating }))}
                        />
                        {rating === 0 ? 'All ratings' : `${rating}+ stars`}
                    </label>
                ))}
            </div>

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

            <Button variant="secondary" onClick={handleReset}>
                Clear Filters
            </Button>
        </div>
    )
}