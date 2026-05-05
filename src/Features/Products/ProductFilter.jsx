import { useDispatch } from "react-redux"
import { resetFilters } from "../../Features/Products/productSlice"
import Button from "../../Components/Button"
import SortControl from "./SortControl"
import CategoryFilter from "./CategoryFilter"
import RatingFilter from "./RatingFilter"
import PriceRangeFilter from "./PriceRangeFilter"



export default function ProductFilter() {
    const dispatch = useDispatch()



    return (
        <div className="product-filters">
            <SortControl />
            <CategoryFilter />
            <RatingFilter />
            <PriceRangeFilter />

            <Button variant="secondary" onClick={() => dispatch(resetFilters())}>
                Clear Filters
            </Button>
        </div>
    )
}