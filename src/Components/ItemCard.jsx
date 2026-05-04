import PropTypes from 'prop-types';
import Button from "./Button";
import { Link } from "react-router-dom";
import productShape from "../propTypes/productShape";

export default function ItemCard({ item, onRemove, onAddToCart, isInCart }) {
    return (
        <div className="card">
            <img className="card-img" src={item.img} />
            <Link to={`/productdetail/${item.id}`}>
                <h2 className="card-title">{item.name}</h2>
            </Link>
            <p className="card-rating">{item.rating}</p>
            <p className="card-price">{item.price}</p>
            <p className="card-stock">{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            {onRemove && <Button onClick={onRemove}>Remove</Button>}
            {onAddToCart && (
                <Button disabled={isInCart} onClick={onAddToCart}>{isInCart ? "Already in Cart" : "Add to Cart"}</Button>
            )}

        </div>
    )
}

ItemCard.propTypes = {
    item: productShape.isRequired,
    onRemove: PropTypes.func,
    onAddToCart: PropTypes.func,
    isInCart: PropTypes.bool,
};