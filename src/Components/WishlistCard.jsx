import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';
import productShape from '../propTypes/productShape';
import ProductRatingLine from './ProductRatingLine';

export default function WishlistCard({ item, onRemove, onAddToCart, isInCart = false }) {
  const inStock = item.stock > 0;

  return (
    <article className='wishlist-card'>
      <Link
        to={`/productdetail/${item.id}`}
        className='wishlist-card__media card-img-wrap'
      >
        <img
          className='card-img'
          src={
            item.img ||
            'https://res.cloudinary.com/dnx0tlcxk/image/upload/v1778245743/mvmobckdnxwhq66leqpo.jpg'
          }
          alt={item.name}
        />
      </Link>

      <div className='wishlist-card__main'>
        <Link to={`/productdetail/${item.id}`} className='wishlist-card__title-link'>
          <h2 className='card-title wishlist-card__title'>{item.name}</h2>
        </Link>
        <div className='wishlist-card__meta'>
          <ProductRatingLine
            product={item}
            className='card-rating wishlist-card__rating'
          />
          <p className='card-price wishlist-card__price'>{item.price}</p>
          <span
            className={`card-stock wishlist-card__stock ${inStock ? '' : 'card-stock--out'}`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className='wishlist-card__actions'>
        <Button variant='danger' type='button' onClick={onRemove}>
          Remove
        </Button>
        <span title={isInCart ? 'Already in cart' : ''} style={{ cursor: isInCart ? 'not-allowed' : 'pointer' }}>
        <Button
          variant='primary'
          type='button'
          disabled={isInCart || !inStock}
          onClick={onAddToCart}
        >
          {isInCart ? 'Already in cart' : 'Add to Cart'}
        </Button>
      </span>

      </div>
    </article>
  );
}

WishlistCard.propTypes = {
  item: productShape.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isInCart: PropTypes.bool,
};
