import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubTotal, selectCartCount } from "../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import CartItem from '../Features/Cart/CartItem';

function formatMoney(n) {
    return n.toFixed(2);
}

export default function CartPage() {
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubTotal);
    const cartCount = useSelector(selectCartCount);

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="page-header">
                    <h1 className="page-title">Your cart</h1>
                    <p className="page-description">Items you add appear here.</p>
                </div>
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <h2 className="empty-state-heading">Your cart is empty</h2>
                    <p>Add products from the catalog — they will show up in this list.</p>
                    <Link to="/" className="btn btn-primary">Browse products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="page-header page-header--split">
                <div>
                    <h1 className="page-title">Your cart</h1>
                    <p className="page-description">
                        {items.length} {items.length === 1 ? "product" : "products"}
                        {" · "}
                        {cartCount} {cartCount === 1 ? "item" : "items"} total
                    </p>
                </div>
                <Link to="/" className="page-header-link">
                    <span className="material-symbols-outlined page-header-link-icon">arrow_back</span>
                    Continue shopping
                </Link>
            </div>
            <div className="cart-layout">
                <div className="cart-main">
                    <div className="cart-items-panel">
                        <div className="cart-list">
                            {items.map(item => <CartItem key={item.id} item={item} />)}
                        </div>
                    </div>
                </div>
                <aside className="cart-summary-panel">
                    <h3 className="cart-summary-heading">Order summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${formatMoney(subTotal)}</span>
                    </div>
                    <div className="summary-row summary-row--muted">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <hr className="summary-divider" />
                    <div className="summary-row total-row summary-total-line">
                        <span>Estimated total</span>
                        <span>${formatMoney(subTotal)}</span>
                    </div>
                    <Link to='/checkout' className="btn btn-primary cart-summary-cta">Proceed to checkout</Link>
                    <p className="cart-summary-note">
                        Taxes are calculated on the checkout page.
                    </p>
                </aside>
            </div>
        </div>
    );
}
