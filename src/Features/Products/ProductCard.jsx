import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectIsInCart } from "../Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Wishlist/wishlistSlice";
import Button from "../../Components/Button"
export default function ProductCard({ product }) {

    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(product.id))
    const isInWishlist = useSelector(selectIsInwishlist(product.id))

    return (
        <div className="product-card">
            <img src={product.img}></img>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.stock > 0 ? "In Stock" : "Out of stock"}</p>
            <p>{product.rating}</p>
            <Button variant="primary" onClick={() => dispatch(addToCart(product))}>{isInCart ? "Added to Cart" : "Add to Cart"}</Button>
            <Button variant="primary" disabled={isInWishlist} onClick={() => dispatch(addTowishlist(product))}>{isInWishlist ? "Already in WishList" : "Add to WishList"}</Button>


        </div>
    )

}