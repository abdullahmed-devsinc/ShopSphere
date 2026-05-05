import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "../Features/Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Features/Wishlist/wishlistSlice";

export function useProductActions(product) {
    const dispatch = useDispatch();
    const productId = product?.id ?? -1;

    const isInCart = useSelector(selectIsInCart(productId));
    const isInWishlist = useSelector(selectIsInwishlist(productId));

    const addProductToCart = () => {
        if (!product || isInCart || product.stock <= 0) return;
        dispatch(addToCart(product));
    };

    const addProductToWishlist = () => {
        if (!product || isInWishlist) return;
        dispatch(addTowishlist(product));
    };

    return {
        isInCart,
        isInWishlist,
        addProductToCart,
        addProductToWishlist,
    };
}