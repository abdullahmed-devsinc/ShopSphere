import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProductById,
  selectSimilarProducts,
} from '../Features/Products/productSlice';
import { addToCart, selectIsInCart } from '../Features/Cart/cartSlice';
import { addTowishlist, selectIsInwishlist } from '../Features/Wishlist/wishlistSlice';
import Button from '../Components/Button';
import NotFoundPage from './NotFoundPage';
import SimilarProductRow from '../Components/SimilarProductsRow';
import ProductRatingLine from '../Components/ProductRatingLine';
import ProductReviews from '../Components/ProductReviews';
import CartStepper from '../Features/Cart/CartStepper';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function ProductDetailPage() {
  const { id } = useParams();
  const pid = Number(id);
  const dispatch = useDispatch();

  const product = useSelector(selectProductById(pid));
  const similar = useSelector(
    selectSimilarProducts(product?.id, product?.category ?? ''),
  );
  const isInCart = useSelector(selectIsInCart(product?.id ?? -1));
  const isInWishlist = useSelector(selectIsInwishlist(product?.id ?? -1));

  const { isAuthenticated, isUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!product) return <NotFoundPage />;

  const handleAddToCart = () => {
    if (!isInCart && product.stock > 0) dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      dispatch(addTowishlist(product));
    }
  };

  return (
    <div className='page product-detail-page'>
      <div className='product-detail-container'>
        <div className='product-detail-gallery'>
          <div className='product-detail-image-wrapper'>
            <img
              src={
                product.img ||
                'https://res.cloudinary.com/dnx0tlcxk/image/upload/v1778245743/mvmobckdnxwhq66leqpo.jpg'
              }
              alt={product.name}
            />
          </div>
        </div>

        <div className='product-detail-content'>
          <span className='product-category-label'>{product.category}</span>
          <h1 className='product-title'>{product.name}</h1>

          <div className='product-rating-box'>
            <ProductRatingLine product={product} />
            <span className='product-review-count'>
              ({product.reviews?.length || 0} customer{' '}
              {product.reviews?.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <div className='product-price-box'>
            <span className='product-price'>{product.price}</span>
            {product.stock > 0 ? (
              <span className='product-stock-badge in-stock'>In Stock</span>
            ) : (
              <span className='product-stock-badge out-of-stock'>Out of Stock</span>
            )}
          </div>

          <div className='product-description-box'>
            <p>
              Experience the perfect blend of style and comfort with the {product.name}.
              Designed for everyday wear, it features premium materials and unparalleled
              craftsmanship.
            </p>
          </div>

          <div className='product-actions-box'>
            {isInCart ? (
              <div className='product-cart-stepper-wrapper'>
                <CartStepper product={product} />
              </div>
            ) : (
              <Button
                variant='primary'
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <span className='material-symbols-outlined' style={{ fontSize: '20px' }}>
                  shopping_bag
                </span>
                Add to Cart
              </Button>
            )}
            <Button
              variant='secondary'
              disabled={isAdmin || isInWishlist}
              onClick={
                isAuthenticated
                  ? handleAddToWishlist
                  : () => navigate('/login', { replace: true })
              }
            >
              <span className='material-symbols-outlined' style={{ fontSize: '20px' }}>
                {isInWishlist ? 'favorite' : 'favorite_border'}
              </span>
              {isAuthenticated
                ? isAdmin
                  ? 'Wishlist is not allowed for Admin'
                  : isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'
                : 'Login to add to Wishlist'}
            </Button>
          </div>

          <div className='product-perks'>
            <div className='perk-item'>
              <span className='material-symbols-outlined'>local_shipping</span>
              <span>Free Delivery</span>
            </div>
            <div className='perk-item'>
              <span className='material-symbols-outlined'>assignment_return</span>
              <span>30 Days Return</span>
            </div>
          </div>
        </div>
      </div>

      <div className='product-bottom-sections'>
        <div className='product-reviews-container'>
          <ProductReviews productId={product.id} reviews={product.reviews} />
        </div>
        <div className='similar-products-container'>
          <SimilarProductRow products={similar} />
        </div>
      </div>
    </div>
  );
}
