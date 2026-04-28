import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartCount } from "../Features/Cart/cartSlice";
import { selectwishlistCount } from "../Features/Wishlist/wishlistSlice"

export default function Navbar() {
    const cartCount = useSelector(selectCartCount);
    const wishlistCount = useSelector(selectwishlistCount);

    return (
        <header className="navbar">
            <h1 className="navbar__brand">ShopSphere</h1>
            <nav className="navbar__links" aria-label="Main navigation">
                <Link to="/" className="navbar__link">Home</Link>
                <span className="navbar__item">
                    <Link to="/cart" className="navbar__link navbar__link--with-badge">Cart</Link>
                    {cartCount > 0 && <span className="navbar__count">{cartCount}</span>}
                </span>
                <span className="navbar__item">
                    <Link to="/wishlist" className="navbar__link navbar__link--with-badge">Wishlist</Link>
                    {wishlistCount > 0 && <span className="navbar__count">{wishlistCount}</span>}
                </span>
            </nav>
        </header>
    );
}