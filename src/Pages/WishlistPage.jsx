import { useSelector } from "react-redux";
import { selectWishlistItems } from "../Features/Wishlist/wishlistSlice";
import ItemCard from "../Components/ItemCard";
import { Link } from "react-router-dom";

export default function WishlistPage() {
    const items = useSelector(selectWishlistItems);

    if (items.length === 0) {
        return (
            <div className="wishlist-page">
                <h1>WishList</h1>
                <p>There are currently no items in Wishlist. Browse for some!</p>
                <Link to='/' className="btn btn-primary">Continue Shopping</Link>
            </div>
        )
    }
    else {
        return (
            <div className="wishlist-page">
                <div className="wishlist-list">
                    {items.map(item =>
                        <ItemCard key={item.id} item={item} />
                    )}
                </div>
            </div>
        )
    }
}