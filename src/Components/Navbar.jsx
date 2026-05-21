import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { selectCartCount } from '../Features/Cart/cartSlice';
import { selectwishlistCount } from '../Features/Wishlist/wishlistSlice';
import ProductSearch from '../Features/Products/ProductSearch';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ onFilterToggle, isFilterOpen }) {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectwishlistCount);
  const location = useLocation();
  const { isAdmin, isUser, isAuthenticated, logout } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isProductListing = location.pathname === '/products';

  const closeMobileNav = () => setIsMobileNavOpen(false);

  const handleLogout = () => {
    closeMobileNav();
    logout();
  };

  return (
    <>
      <header className={`navbar ${isProductListing ? 'navbar--products' : ''}`}>
        <div className='navbar__left'>
          <Link to='/' className='navbar__brand'>
            ShopSphere
          </Link>

          {isProductListing && (
            <button
              className={`navbar__filter-btn ${isFilterOpen ? 'active' : ''}`}
              onClick={onFilterToggle}
            >
              <span className='material-symbols-outlined'>tune</span>
              <span>Filters</span>
            </button>
          )}
        </div>

        {isProductListing && (
          <div className='navbar__search'>
            <span className='material-symbols-outlined navbar__search-icon'>search</span>
            <ProductSearch />
          </div>
        )}

        <button
          className='navbar__menu-btn'
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
        >
          <span className='material-symbols-outlined'>
            {isMobileNavOpen ? 'close' : 'menu'}
          </span>
        </button>

        <nav className={`navbar__links ${isMobileNavOpen ? 'open' : ''}`}>
          <NavLink
            to='/products'
            onClick={closeMobileNav}
            className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
          >
            Products
          </NavLink>

          {isAdmin && (
            <NavLink
              to='/add'
              onClick={closeMobileNav}
              className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
            >
              Add Product
            </NavLink>
          )}

          <div className='navbar__icon-links'>
            {isAuthenticated && isUser && (
              <span className='navbar__item'>
                <Link
                  to='/wishlist'
                  onClick={closeMobileNav}
                  className='navbar__link navbar__link--icon'
                >
                  <span className='material-symbols-outlined'>favorite</span>
                </Link>
                {wishlistCount > 0 && (
                  <span className='navbar__count'>{wishlistCount}</span>
                )}
              </span>
            )}

            <span className='navbar__item'>
              <Link
                to='/cart'
                onClick={closeMobileNav}
                className='navbar__link navbar__link--icon'
              >
                <span className='material-symbols-outlined'>shopping_cart</span>
              </Link>
              {cartCount > 0 && <span className='navbar__count'>{cartCount}</span>}
            </span>
          </div>

          {isAuthenticated ? (
            <button className='navbar__logout-btn' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              onClick={closeMobileNav}
              className='navbar__link navbar__link--login'
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      <button
        className={`navbar__overlay ${isMobileNavOpen ? 'open' : ''}`}
        onClick={closeMobileNav}
      />
    </>
  );
}
