import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCartCount } from "../Features/Cart/cartSlice";
import { selectwishlistCount } from "../Features/Wishlist/wishlistSlice";
import ProductSearch from "../Features/Products/ProductSearch";

export default function Navbar({ onFilterToggle, isFilterOpen }) {
    const cartCount = useSelector(selectCartCount);
    const wishlistCount = useSelector(selectwishlistCount);
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header className="navbar">
            <div className="navbar__left">
                <Link to="/" className="navbar__brand">ShopSphere</Link>
                {isHome && (
                    <button
                        className={`navbar__filter-btn ${isFilterOpen ? 'active' : ''}`}
                        onClick={onFilterToggle}
                        aria-label="Toggle filters"
                    >
                        <span className="material-symbols-outlined">tune</span>
                        <span>Filters</span>
                    </button>
                )}
            </div>

            {isHome && (
                <div className="navbar__search">
                    <span className="material-symbols-outlined navbar__search-icon">search</span>
                    <ProductSearch />
                </div>
            )}

            <nav className="navbar__links" aria-label="Main navigation">
                <Link to="/add" className="navbar__link">Add Product</Link>
                <span className="navbar__item">
                    <Link to="/wishlist" className="navbar__link navbar__link--icon" aria-label="Wishlist">
                        <span className="material-symbols-outlined">favorite</span>
                    </Link>
                    {wishlistCount > 0 && <span className="navbar__count">{wishlistCount}</span>}
                </span>
                <span className="navbar__item">
                    <Link to="/cart" className="navbar__link navbar__link--icon" aria-label="Cart">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </Link>
                    {cartCount > 0 && <span className="navbar__count">{cartCount}</span>}
                </span>
            </nav>
        </header>
    );
}