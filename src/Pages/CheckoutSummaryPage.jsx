import { useSelector } from "react-redux";
import { selectCartItems } from "../Features/Cart/cartSlice";
import ItemCard from "../Components/ItemCard";
import { Link } from "react-router-dom";

export default function CheckoutSummaryPage() {
    const items = useSelector(selectCartItems);

    if (items.length === 0) {
        return (
            <div className="page checkout-page">
                <h1 className="page-title">Checkout</h1>
                <p className="page-description">There are currently no items in your cart. Browse for some!</p>
                <Link to='/' className="btn btn-primary">Continue Shopping</Link>
            </div>
        )
    }
    else {
        return (
            <div className="checkout-page">
                <div className="checkout-list">
                    {items.map(item =>
                        <ItemCard key={item.id} item={item} />
                    )}
                </div>
            </div>
        )
    }
}