import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectIsInCart } from "../Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Wishlist/wishlistSlice";
import { Link } from 'react-router-dom'
import Button from "../../Components/Button"
import productShape from "../../propTypes/productShape";

export default function ProductCard({ product }) {

    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(product.id))
    const isInWishlist = useSelector(selectIsInwishlist(product.id))

    return (
        <div className="card">
            <img className="card-img" src={product.img}></img>
            <Link to={`/productdetail/${product.id}`}>
                <h2 className="card-title">{product.name}</h2>
            </Link>
            <p className="card-price">{product.price}</p>
            <p className="card-stock">{product.stock > 0 ? "In Stock" : "Out of stock"}</p>
            <p className="card-rating">{product.rating}</p>
            <Button variant="primary" onClick={() => dispatch(addToCart(product))}>{isInCart ? "Increase Quantity" : "Add to Cart"}</Button>
            <Button variant="primary" disabled={isInWishlist} onClick={() => dispatch(addTowishlist(product))}>{isInWishlist ? "Already in WishList" : "Add to WishList"}</Button>


        </div>
    )

}
ProductCard.propTypes = {
    product: productShape.isRequired,
};