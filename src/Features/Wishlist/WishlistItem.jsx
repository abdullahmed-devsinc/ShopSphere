import { useSelector, useDispatch } from "react-redux";
import { selectIsInCart } from "../Cart/cartSlice";
import { removeFromwishlist } from "./wishlistSlice";
import { addToCart } from "../Cart/cartSlice";
import WishlistCard from "../../Components/WishlistCard";
import productShape from "../../propTypes/productShape";

export default function WishlistItem({ item }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(item.id));

    return (
        <WishlistCard
            item={item}
            onRemove={() => dispatch(removeFromwishlist(item.id))}
            onAddToCart={() => dispatch(addToCart(item))}
            isInCart={isInCart}
        />
    );
}

WishlistItem.propTypes = {
    item: productShape.isRequired,
};
