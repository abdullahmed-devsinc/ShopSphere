import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { selectFilteredProducts, setFilters } from "../Features/Products/productSlice"
import ProductGrid from "../Features/Products/ProductGrid"
import ProductFilter from "../Features/Products/ProductFilter"
import PropTypes from "prop-types"
import { PRODUCT_CATEGORIES } from "../Constants/productConstants"
import { useSearchParams } from "react-router-dom"

export default function ProductListingPage({ isFilterOpen, setIsFilterOpen }) {
    const products = useSelector(selectFilteredProducts);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const categoryParam = (searchParams.get("category") || "all").toLowerCase();
        const category = PRODUCT_CATEGORIES.includes(categoryParam) ? categoryParam : "all"
        dispatch(setFilters({ category }));
    }, [searchParams, dispatch])

    return (
        <div className="product-listing-page">
            <div className={`filter-sidebar-overlay ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)} />
            <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
                <div className="filter-sidebar__header">
                    <span className="filter-sidebar__title">Filters</span>
                    <button className="filter-sidebar__close" onClick={() => setIsFilterOpen(false)} aria-label="Close filters">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <ProductFilter />
            </aside>

            <div className="product-main">
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

ProductListingPage.propTypes = {
    isFilterOpen: PropTypes.bool,
    setIsFilterOpen: PropTypes.func,
}