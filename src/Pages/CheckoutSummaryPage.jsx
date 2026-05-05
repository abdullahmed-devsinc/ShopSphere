import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, selectCartItems, selectCartSubTotal, selectCartCount } from "../Features/Cart/cartSlice";
import CheckoutLineItem from "../Components/CheckoutLineItem";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import CheckoutSuccessPopup from "../Components/CheckoutSuccessPopup";
import { calculateTotal, calculateTax, tax_rate } from "../utils/tax";

function formatMoney(n) {
    return n.toFixed(2);
}

export default function CheckoutSummaryPage() {
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubTotal);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const taxAmount = calculateTax(subTotal);
    const grandTotal = calculateTotal(subTotal);

    const handleCheckout = () => {
        dispatch(clearCart());
        setShowSuccessPopup(true);
    };

    if (showSuccessPopup) {
        return <CheckoutSuccessPopup />;
    }

    if (items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="page-header">
                    <h1 className="page-title">Checkout</h1>
                    <p className="page-description">Almost there — review and confirm your order.</p>
                </div>
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </div>
                    <h2 className="empty-state-heading">Your cart is empty</h2>
                    <p>Add items to your cart before checking out.</p>
                    <Link to='/' className="btn btn-primary">Browse products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="page-header page-header--split">
                <div>
                    <h1 className="page-title">Checkout</h1>
                    <p className="page-description">
                        {cartCount} {cartCount === 1 ? "item" : "items"}
                        {" · "}
                        Review details and confirm your purchase
                    </p>
                </div>
                <Link to="/cart" className="page-header-link">
                    <span className="material-symbols-outlined page-header-link-icon">arrow_back</span>
                    Back to cart
                </Link>
            </div>

            <div className="checkout-layout">
                <div className="checkout-items">
                    <h3 className="checkout-section-title">Items in your order</h3>
                    <div className="checkout-list">
                        {items.map(item =>
                            <CheckoutLineItem key={item.id} item={item} />
                        )}
                    </div>
                </div>

                <aside className="checkout-summary-box">
                    <h3>Order summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${formatMoney(subTotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax ({Math.round(tax_rate * 100)}%)</span>
                        <span>${formatMoney(taxAmount)}</span>
                    </div>
                    <div className="summary-row summary-row--muted">
                        <span>Shipping</span>
                        <span>Standard · calculated separately</span>
                    </div>
                    <hr className="summary-divider" />
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>${formatMoney(grandTotal)}</span>
                    </div>
                    <div className="checkout-submit-wrap">
                        <Button variant="primary" onClick={handleCheckout}>
                            Complete purchase
                        </Button>
                    </div>
                    <p className="checkout-trust-note">
                        By completing your purchase you agree to our standard terms for demo checkout.
                    </p>
                </aside>
            </div>
        </div>
    );
}
