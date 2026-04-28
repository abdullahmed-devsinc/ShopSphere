import { useSelector } from "react-redux";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import WishlistItem from "../Features/Wishlist/WishlistItem";
import { selectWishlistItems } from "../Features/Wishlist/wishlistSlice";

export default function WishlistPage() {
    const items = useSelector(selectWishlistItems);
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="wishlist-page">
                <h1>WishList</h1>
                <p>There are currently no items in Wishlist. Browse for some!</p>
                <Button variant="primary" onClick={() => navigate('/', { replace: true })}>Home</Button>
            </div>
        )
    }
    else {
        return (
            <div className="wishlist-page">
                <div className="wishlist-list">
                    {items.map(item =>
                        <WishlistItem key={item.id} item={item} />
                    )}
                </div>
            </div>
        )
    }
}