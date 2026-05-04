import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilters, setSortBy, resetFilters } from "../../Features/Products/productSlice"
import Button from "../../Components/Button"

export default function ProductFilter() {
    const dispatch = useDispatch()
    const currentFilters = useSelector((state) => state.products.filters)
    const currentSort = useSelector((state) => state.products.SortBy)
    const [minPrice, setMinPrice] = useState(12)
    const [maxPrice, setMaxPrice] = useState(499)

    return (
        <div className="product-filters">

            <div className="filter-group">
                <h3>Sort By</h3>
                <select
                    value={currentSort}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}>
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
                        {rating === 0 ? 'All' : `${rating}+`}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="price-inputs">
                    <input
                        type="number"
                        value={minPrice}
                        min={12}
                        max={maxPrice}
                        onChange={(e) => {
                            setMinPrice(+e.target.value)
                            dispatch(setFilters({ priceRange: [+e.target.value, maxPrice] }))
                        }}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        value={maxPrice}
                        min={minPrice}
                        max={499}
                        onChange={(e) => {
                            setMaxPrice(+e.target.value)
                            dispatch(setFilters({ priceRange: [minPrice, +e.target.value] }))
                        }}
                    />
                </div>
            </div>
            <Button
                variant="secondary"
                onClick={() => {
                    dispatch(resetFilters())
                    setMinPrice(12)
                    setMaxPrice(499)
                }}
            >
                Clear Filters
            </Button>
        </div>
    )
}