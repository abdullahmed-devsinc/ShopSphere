import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { updateQuantity, removeFromCart } from "./cartSlice";
import { selectStock } from "../Products/productSlice";

function formatMoney(n) {
    return n.toFixed(2);
}

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const itemStock = useSelector(selectStock(item.id));
    const lineTotal = item.quantity * item.price;

    return (
        <div className="card card-horizontal cart-item-row">
            <Link to={`/productdetail/${item.id}`} className="card-img-wrap card-img-wrap--link">
                <img className="card-img" src={item.img} alt={item.name} />
            </Link>
            <div className="cart-item-info">
                <Link to={`/productdetail/${item.id}`} className="cart-item-title-link">
                    <h3 className="card-title">{item.name}</h3>
                </Link>
                <p className="card-price-per-item">${formatMoney(item.price)} each</p>
            </div>
            <div className="card-qty-stepper card-qty-stepper--cart">
                <Button
                    variant="card-qty-btn"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                >
                    <span className="material-symbols-outlined">remove</span>
                </Button>
                <span className="card-qty-count">{item.quantity}</span>
                <Button
                    variant="card-qty-btn"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    disabled={itemStock <= item.quantity}
                    aria-label="Increase quantity"
                >
                    <span className="material-symbols-outlined">add</span>
                </Button>
            </div>
            <p className="card-price cart-item-line-total">${formatMoney(lineTotal)}</p>
            <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
            </Button>
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
