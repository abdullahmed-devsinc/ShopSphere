import { useSelector } from 'react-redux';
import { selectWishlistItems } from '../Features/Wishlist/wishlistSlice';
import WishlistItem from '../Features/Wishlist/WishlistItem';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const items = useSelector(selectWishlistItems);

  if (items.length === 0) {
    return (
      <div className='wishlist-page'>
        <div className='page-header'>
          <h1 className='page-title'>Wishlist</h1>
          <p className='page-description'>Products you save for later live here.</p>
        </div>
        <div className='empty-state'>
          <div className='empty-state-icon empty-state-icon--accent'>
            <span className='material-symbols-outlined'>favorite</span>
          </div>
          <h2 className='empty-state-heading'>Your wishlist is empty</h2>
          <p>
            Tap the heart on a product to save it — you can move items to your cart
            anytime.
          </p>
          <Link to='/products' className='btn btn-primary'>
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='wishlist-page'>
      <div className='page-header page-header--split'>
        <div>
          <h1 className='page-title'>Wishlist</h1>
          <p className='page-description'>
            {items.length} saved {items.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <Link to='/cart' className='page-header-link'>
          View cart
          <span className='material-symbols-outlined page-header-link-icon page-header-link-icon--trailing'>
            shopping_cart
          </span>
        </Link>
      </div>
      <div className='wishlist-panel'>
        <div className='wishlist-list'>
          {items.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
