import { useSelector } from "react-redux"
import { selectFilteredProducts } from "../Features/Products/productSlice"
import ProductGrid from "../Features/Products/ProductGrid"
import ProductSearch from "../Features/Products/ProductSearch";
import ProductFilter from "../Features/Products/ProductFilter";

export default function ProductListingPage() {
    const products = useSelector(selectFilteredProducts)

    return (
        <div className="product-listing">
            <ProductFilter />
            <div className="listing-main">
                <ProductSearch />
                <ProductGrid products={products} />
            </div>
        </div>
    )
}