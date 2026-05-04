import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubTotal } from "../Features/Cart/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import CartItem from '../Features/Cart/CartItem';

export default function CartPage() {
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubTotal);
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <h1>Your cart is empty</h1>
                    <p>Add some products to your cart and they will appear here.</p>
                    <Link to="/" className="btn btn-primary">Browse Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="page-header">
                <h1 className="page-title">Your Cart</h1>
            </div>
            <div className="cart-list">
                {items.map(item => <CartItem key={item.id} item={item} />)}
            </div>
            <div className="cart-summary">
                <p>Subtotal: <span>${subTotal}</span></p>
                <Link to='/checkout' className="btn btn-primary">Proceed to Checkout</Link>
            </div>
        </div>
    );
}