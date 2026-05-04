import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateQuantity, selectIsInCart, selectCartItemById } from "../Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Wishlist/wishlistSlice";
import { selectStock } from "./productSlice";
import { Link } from 'react-router-dom';
import Button from "../../Components/Button";
import productShape from "../../propTypes/productShape";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(product.id));
    const cartItem = useSelector(selectCartItemById(product.id));
    const isInWishlist = useSelector(selectIsInwishlist(product.id));
    const stock = useSelector(selectStock(product.id));

    const quantity = cartItem?.quantity ?? 0;
    const atMaxStock = quantity >= stock;

    const handleDecrease = () => {
        if (quantity <= 1) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
        }
    };

    const handleIncrease = () => {
        if (!atMaxStock) {
            dispatch(addToCart(product));
        }
    };

    return (
        <div className="card">
            <div className="card-img-wrap">
                <img className="card-img" src={product.img} alt={product.name} />
            </div>
            <div className="card-body">
                <span className="card-category">{product.category}</span>
                <Link to={`/productdetail/${product.id}`}>
                    <h2 className="card-title">{product.name}</h2>
                </Link>
                <p className="card-rating">{product.rating}</p>
                <p className="card-price">{product.price}</p>
                <p className="card-stock">{product.stock > 0 ? "In Stock" : "Out of stock"}</p>
            </div>
            <div className="card-actions">
                {isInCart ? (
                    <div className="card-qty-stepper">
                        <button
                            className="card-qty-btn"
                            onClick={handleDecrease}
                            aria-label="Decrease quantity"
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="card-qty-count">{quantity}</span>
                        <button
                            className="card-qty-btn"
                            onClick={handleIncrease}
                            disabled={atMaxStock}
                            aria-label="Increase quantity"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                ) : (
                    <Button
                        variant="primary"
                        onClick={() => dispatch(addToCart(product))}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </Button>
                )}
                <Button
                    variant="secondary"
                    disabled={isInWishlist}
                    onClick={() => dispatch(addTowishlist(product))}
                >
                    {isInWishlist ? "Saved" : "Wishlist"}
                </Button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: productShape.isRequired,
};