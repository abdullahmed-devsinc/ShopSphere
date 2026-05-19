import { Link, replace } from 'react-router-dom';
import Button from '../../Components/Button';
import productShape from '../../propTypes/productShape';
import CartStepper from '../Cart/CartStepper';
import PropTypes from 'prop-types';
import ProductRatingLine from '../../Components/ProductRatingLine';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  isInCart,
  isInWishlist,
  isUserLoggedIn,
  checkIfAdmin,
  onAddToCart,
  onAddToWishlist,
}) {
  const navigate = useNavigate();
  return (
    <div className='card'>
      <Link to={`/productdetail/${product.id}`}>
        <div className='card-img-wrap'>
          <img
            className='card-img'
            src={
              product.img ||
              'https://res.cloudinary.com/dnx0tlcxk/image/upload/v1778245743/mvmobckdnxwhq66leqpo.jpg'
            }
            alt={product.name}
          />
        </div>
        <div className='card-body'>
          <span className='card-category'>{product.category}</span>

          <h2 className='card-title'>{product.name}</h2>
          <ProductRatingLine product={product} />
          <p className='card-price'>{product.price}</p>
          <p className='card-stock'>{product.stock > 0 ? 'In Stock' : 'Out of stock'}</p>
        </div>
      </Link>

      <div className='card-actions'>
        {isInCart ? (
          <CartStepper product={product} />
        ) : (
          <Button variant='primary' onClick={onAddToCart} disabled={product.stock === 0}>
            Add to Cart
          </Button>
        )}
        {isUserLoggedIn ? (
          <Button variant='secondary' disabled={isInWishlist} onClick={onAddToWishlist}>
            {isInWishlist ? 'Saved in Wishlist' : 'Wishlist'}
          </Button>
        ) : checkIfAdmin ? (
          <Button variant='secondary' disabled={true}>
            Wishlist not allowed for Admin
          </Button>
        ) : (
          <Button
            variant='secondary'
            onClick={() => navigate('/login', { replace: true })}
          >
            Login to add to Wishlist
          </Button>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: productShape.isRequired,
  isInCart: PropTypes.bool.isRequired,
  isInWishlist: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};
