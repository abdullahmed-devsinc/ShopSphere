import { useSelector, useDispatch, Provider } from "react-redux";
import Button from "../../Components/Button";
import { addToCart, removeFromCart, selectCartItemById, updateQuantity } from "./cartSlice";
import { selectStock } from "../Products/productSlice";

export default function CartStepper({ product }) {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(product.id))
    const stock = useSelector(selectStock(product.id))
    const quantity = cartItem?.quantity ?? 0
    const atMaxStock = quantity >= stock

    const handleDecrease = () => {
        if (quantity <= 1) {
            dispatch(removeFromCart(product.id))
        }
        else {
            dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
        }
    }
    const handleIncrease = () => {
        if (!atMaxStock) {
            dispatch(addToCart(product))
        }
    }

    return (
        <div className="card-qty-stepper">
            <Button variant="card-qty-btn" onClick={handleDecrease}>
                <span className="material-symbols-outlined">remove</span>
            </Button>

            <span className="card-qty-count">{quantity}</span>
            <Button
                variant="card-qty-btn"
                onClick={handleIncrease}
                disabled={atMaxStock}
            >
                <span className="material-symbols-outlined">add</span>
            </Button>
        </div >
    )
}