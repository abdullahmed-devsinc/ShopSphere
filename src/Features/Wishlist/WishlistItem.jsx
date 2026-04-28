import { useSelector, useDispatch } from "react-redux";
import Button from "../../Components/Button";
import { selectIsInCart } from "../Cart/cartSlice";
import { removeFromwishlist } from "./wishlistSlice";
import { addToCart } from "../Cart/cartSlice";

export default function WishlistItem({ item }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(item.id))
    return (
        <div className="wishlist-item">
            <img src={item.img} />
            <h3>{item.name}</h3>
            <p>{item.rating}</p>
            <p>{item.price}</p>
            <p>{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            <Button variant="primary" onClick={() => dispatch(removeFromwishlist(item.id))}>Remove from WishList</Button>
            <Button variant="primary" disabled={isInCart} onClick={() => dispatch(addToCart(item))}>{isInCart ? "Item Already in Cart" : "Add to Cart"}</Button>

        </div>
    )
}