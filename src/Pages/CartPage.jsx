import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubTotal } from "../Features/Cart/cartSlice";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import CartItem from '../Features/Cart/CartItem'
export default function CartPage() {
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubTotal);
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <h1>Cart</h1>
                <p>There are currently no items in cart. Browse for some!</p>
                <Button variant="primary" onClick={() => navigate('/', { replace: true })}>Home</Button>
            </div>
        )
    }
    else {
        return (
            <div className="cart-page">
                <div className="cart-list">
                    {items.map(item =>
                        <CartItem key={item.id} item={item} />
                    )}
                </div>
                <div className="cart-summary">
                    <p>Sub Total: <span>${subTotal}</span></p>
                    <Button variant="primary" onClick={() => navigate('/checkout', { replace: true })}>Proceed to Checkout</Button>
                </div>
            </div>
        )
    }
}