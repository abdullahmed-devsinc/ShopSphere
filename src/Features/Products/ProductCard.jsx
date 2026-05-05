import { Link } from 'react-router-dom';
import Button from "../../Components/Button";
import productShape from "../../propTypes/productShape";
import CartStepper from "../Cart/CartStepper";
import PropTypes from "prop-types";
import ProductRatingLine from "../../Components/ProductRatingLine";

export default function ProductCard({ product, isInCart, isInWishlist, onAddToCart, onAddToWishlist }) {

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
                <ProductRatingLine product={product} />
                <p className="card-price">{product.price}</p>
                <p className="card-stock">{product.stock > 0 ? "In Stock" : "Out of stock"}</p>
            </div>
            <div className="card-actions">
                {isInCart ? (
                    <CartStepper product={product} />

                ) : (
                    <Button
                        variant="primary"
                        onClick={onAddToCart}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </Button>
                )}
                <Button
                    variant="secondary"
                    disabled={isInWishlist}
                    onClick={onAddToWishlist}
                >
                    {isInWishlist ? "Saved" : "Wishlist"}
                </Button>
            </div>
        </div >
    );
}

ProductCard.propTypes = {
    product: productShape.isRequired,
    isInCart: PropTypes.bool.isRequired,
    isInWishlist: PropTypes.bool.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onAddToWishlist: PropTypes.func.isRequired
};