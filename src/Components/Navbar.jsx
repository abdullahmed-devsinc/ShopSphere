import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartCount } from "../Features/Cart/CartSlice";
import { selectWishlistCount } from "../Features/WishList/WishListSlice";

export default function Navbar() {
    return (
        <header className="navbar">
            <h1 className="navbar__brand">ShopSphere</h1>
            <nav className="navbar__links" aria-label="Main navigation">
                <Link to="/" className="navbar__link">Home</Link>
                <span className="navbar__item">
                    <Link to="/cart" className="navbar__link navbar__link--with-badge">Cart</Link>
                    <span className="navbar__count">{useSelector(selectCartCount)}</span>
                </span>
                <span className="navbar__item">
                    <Link to="/cart" className="navbar__link navbar__link--with-badge">WishList</Link>
                    <span className="navbar__count">{useSelector(selectWishlistCount)}</span>
                </span>            </nav>
        </header>
    );
}