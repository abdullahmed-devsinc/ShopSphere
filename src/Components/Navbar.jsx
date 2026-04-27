import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="navbar">
            <h1 className="navbar__brand">ShopSphere</h1>
            <nav className="navbar__links" aria-label="Main navigation">
                <Link to="/" className="navbar__link">Home</Link>
                <Link to="/cart" className="navbar__link">Cart</Link>
                <Link to="/checkout" className="navbar__link">Checkout</Link>
                <Link to="/wishlist" className="navbar__link">Wishlist</Link>
            </nav>
        </header>
    );
}