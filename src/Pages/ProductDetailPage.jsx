import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById, selectSimilarProducts } from "../Features/Products/productSlice";
import { addToCart, selectIsInCart } from "../Features/Cart/cartSlice";
import { addTowishlist, selectIsInwishlist } from "../Features/Wishlist/wishlistSlice";
import Button from "../Components/Button";
import NotFoundPage from "./NotFoundPage";
import SimilarProductRow from "../Components/SimilarProductsRow";
import ProductRatingLine from "../Components/ProductRatingLine";
import ProductReviews from "../Components/ProductReviews";

export default function ProductDetailPage() {
    const { id } = useParams();
    const pid = Number(id);
    const dispatch = useDispatch();

    const product = useSelector(selectProductById(pid));
    const similar = useSelector(selectSimilarProducts(pid, product?.category ?? ""));
    const isInCart = useSelector(selectIsInCart(product?.id ?? -1));
    const isInWishlist = useSelector(selectIsInwishlist(product?.id ?? -1));

    if (!product) return <NotFoundPage />;

    const handleAddToCart = () => {
        if (!isInCart && product.stock > 0) {
            dispatch(addToCart(product));
        }
    };

    const handleAddToWishlist = () => {
        if (!isInWishlist) {
            dispatch(addTowishlist(product));
        }
    };

    return (
        <div className="page product-detail">
            <div className="product-detail__image">
                <img
                    src={product.img || "https://placehold.co/600x600?text=No+Image"}
                    alt={product.name}
                />
            </div>

            <div className="product-detail__info">
                <h1 className="page-title">{product.name}</h1>
                <ProductRatingLine product={product} />
                <p className="card-price">{product.price}</p>
                <p className="card-stock">{product.stock > 0 ? "In Stock" : "Out of stock"}</p>

                <div className="product-detail__actions">
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={isInCart || product.stock <= 0}
                    >
                        {isInCart ? "Added to Cart" : "Add to Cart"}
                    </Button>

                    <Button
                        variant="secondary"
                        disabled={isInWishlist}
                        onClick={handleAddToWishlist}
                    >
                        {isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                    </Button>
                </div>

                <ProductReviews productId={product.id} reviews={product.reviews} />
            </div>

            <div className="product-detail__similar">
                <SimilarProductRow products={similar} />
            </div>
        </div>
    );
}