import { useDispatch, useSelector } from "react-redux"
import { selectFilteredProducts } from "../Features/Products/productSlice"
import ProductGrid from "../Features/Products/ProductGrid"
import useDebounce from "../hooks/useDebounce";
import ProductSearch from "../Features/Products/ProductSearch";

export default function ProductListingPage() {
    const products = useSelector(selectFilteredProducts)
    const dispatch = useDispatch();
    const debounce = useDebounce();
    return (
        <div className="product-listing">
            <ProductSearch />
            <ProductGrid products={products} />
        </div>
    )
}