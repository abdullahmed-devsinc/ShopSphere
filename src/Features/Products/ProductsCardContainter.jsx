import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectIsInCart } from "../Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Wishlist/wishlistSlice";

import ProductCard from "./ProductCard";
import productShape from "../../propTypes/productShape";

export default function ProductCardContainer({ product }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(selectIsInCart(product.id));
    const isInWishlist = useSelector(selectIsInwishlist(product.id));

    return (
        <ProductCard
            product={product}
            isInCart={isInCart}
            isInWishlist={isInWishlist}
            onAddToCart={() => dispatch(addToCart(product))}
            onAddToWishlist={() => dispatch(addTowishlist(product))}
        />
    )
}
ProductCardContainer.propTypes = {
    product: productShape.isRequired
}