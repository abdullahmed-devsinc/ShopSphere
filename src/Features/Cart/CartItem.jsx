import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Components/Button";
import { updateQuantity, removeFromCart } from "./cartSlice";
import { selectStock } from "../Products/productSlice";

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const itemStock = useSelector(selectStock(item.id));

    return (
        <div className="card card-horizontal">
            <img className="card-img" src={item.img} />
            <h3 className="card-title">{item.name}</h3>
            <div className="card-quantity">
                <Button variant="secondary" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} disabled={itemStock <= item.quantity}> + </Button>
                <p>{item.quantity}</p>
                <Button variant="secondary" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>-</Button>
            </div>
            <p className="card-price-per-item">Price per item: $ {item.price}</p>
            <p className="card-price">Total Price: ${item.quantity * item.price}</p>
            <Button variant="secondary" onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        img: PropTypes.string,
    }).isRequired,
};