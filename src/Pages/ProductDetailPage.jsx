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
import CartStepper from "../Features/Cart/CartStepper";
export default function ProductDetailPage() {
    const { id } = useParams();
    const pid = Number(id);
    const dispatch = useDispatch();

    const product = useSelector(selectProductById(pid));
    const similar = useSelector(selectSimilarProducts(product?.id, product?.category ?? ""));
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
        <div className="page product-detail-page">
            <section className="product-detail">
                <div className="product-detail__image">
                    <img
                        src={product.img || "https://placehold.co/600x600?text=No+Image"}
                        alt={product.name}
                    />
                </div>

                <div className="product-detail__info">
                    <header className="page-header product-detail__header">
                        <h1 className="page-title">{product.name}</h1>
                        <p className="page-description">
                            Category: {product.category}
                        </p>
                    </header>

                    <div>
                        <ProductRatingLine product={product} />
                    </div>

                    <div className="product-detail__meta">
                        <p className="card-price product-detail__price">{product.price}</p>
                        {product.stock > 0 ? (
                            <span className="card-stock">In Stock</span>
                        ) : (
                            <span className="card-stock card-stock--out">Out of Stock</span>
                        )}
                    </div>

                    <div className="product-detail__actions">
                        {isInCart ? (
                            <CartStepper product={product} />

                        ) : (
                            <Button
                                variant="primary"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                Add to Cart
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            disabled={isInWishlist}
                            onClick={handleAddToWishlist}
                        >
                            {isInWishlist ? "Saved" : "Wishlist"}
                        </Button>
                    </div>
                </div>
            </section>

            <section className="product-detail-bottom">
                <div className="product-detail-section product-detail-section--reviews">
                    <ProductReviews productId={product.id} reviews={product.reviews} />
                </div>

                <div className="product-detail-section">
                    <SimilarProductRow products={similar} />
                </div>
            </section>
        </div>
    );
}