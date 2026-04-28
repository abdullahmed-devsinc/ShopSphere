import { useSelector } from "react-redux"
import { selectFilteredProducts } from "../Features/Products/productSlice"
import ProductGrid from "../Features/Products/ProductGrid"
import ProductSearch from "../Features/Products/ProductSearch";

export default function ProductListingPage() {
    const products = useSelector(selectFilteredProducts)

    return (
        <div className="product-listing">
            <ProductSearch />
            <ProductGrid products={products} />
        </div>
    )
}