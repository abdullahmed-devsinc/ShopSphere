import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, selectCartItems, selectCartSubTotal } from "../Features/Cart/cartSlice";
import ItemCard from "../Components/ItemCard";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import CheckoutSuccessPopup from "../Components/CheckoutSuccessPopup";


export default function CheckoutSummaryPage() {
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubTotal);
    const dispatch = useDispatch();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleCheckout = () => {
        dispatch(clearCart());
        setShowSuccessPopup(true);
    };

    if (items.length === 0 && !showSuccessPopup) {
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
                <h1 className="page-title">Checkout</h1>
                <div className="checkout-list">
                    {items.map(item =>
                        <ItemCard key={item.id} item={item} />
                    )}
                </div>
                <div className="checkout-page-subtotal total-row" style={{ marginTop: '24px' }}>
                    Total Order Price: ${subTotal.toFixed(2)}
                </div>
                <div className="checkout-page-subtotal total-row" style={{ marginTop: '24px' }}>
                    Tax: 5%
                </div>
                <div className="checkout-page-subtotal total-row" style={{ marginTop: '24px' }}>
                    Price Including Taxes: ${(subTotal + subTotal * 0.05).toFixed(2)}
                </div>
                <Button variant="primary" onClick={handleCheckout}>Complete Checkout</Button>
                {showSuccessPopup && <CheckoutSuccessPopup />}
            </div>
        )
    }
}