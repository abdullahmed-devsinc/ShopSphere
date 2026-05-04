import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { selectIsInCart } from "../Cart/cartSlice";
import { removeFromwishlist } from "./wishlistSlice";
import { addToCart } from "../Cart/cartSlice";
import ItemCard from "../../Components/ItemCard";
import productShape from "../../propTypes/productShape";


export default function WishlistItem({ item }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(item.id))
    return (
        <div className="wishlist-item">
            <ItemCard
                item={item}
                onRemove={() => dispatch(removeFromwishlist(item.id))}
                onAddToCart={() => dispatch(addToCart(item))}
                isInCart={isInCart}
            />
        </div>
    )
}
WishlistItem.propTypes = {
    item: productShape.isRequired,
};