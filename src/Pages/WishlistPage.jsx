import { useSelector } from "react-redux";
import { selectWishlistItems } from "../Features/Wishlist/wishlistSlice";
import WishlistItem from "../Features/Wishlist/WishlistItem";
import { Link } from "react-router-dom";

export default function WishlistPage() {
    const items = useSelector(selectWishlistItems);

    if (items.length === 0) {
        return (
            <div className="wishlist-page">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <h1>Your wishlist is empty</h1>
                    <p>Save products you like and come back to them later.</p>
                    <Link to='/' className="btn btn-primary">Browse Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="page-header">
                <h1 className="page-title">Your Wishlist</h1>
            </div>
            <div className="wishlist-list">
                {items.map(item => <WishlistItem key={item.id} item={item} />)}
            </div>
        </div>
    );
}