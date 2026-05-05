import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, selectCartItemById, updateQuantity } from "./cartSlice";
import { selectStock } from "../Products/productSlice";
import QuantityStepper from "../../Components/Cart/QuantityStepper";

export default function CartStepper({ product }) {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(product.id));
    const stock = useSelector(selectStock(product.id));
    const quantity = cartItem?.quantity ?? 0;
    const atMaxStock = quantity >= stock;

    const handleDecrease = () => {
        if (quantity <= 1) {
            dispatch(removeFromCart(product.id));
            return;
        }
        dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    };

    const handleIncrease = () => {
        if (!atMaxStock) dispatch(addToCart(product));
    };

    return (
        <QuantityStepper
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            disableDecrease={quantity <= 0}
            disableIncrease={atMaxStock}
        />
    );
}

CartStepper.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
};