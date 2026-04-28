import Button from "./Button";
import { Link } from "react-router-dom";

export default function ItemCard({ item, onRemove, onAddToCart, isInCart }) {
    return (
        <div className="card">
            <img className="card-img" src={item.img} />
            <Link to={`/productdetail/${product.id}`}>
                <h2 className="card-title">{product.name}</h2>
            </Link>
            <p className="card-rating">{item.rating}</p>
            <p className="card-price">{item.price}</p>
            <p className="card-stock">{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            {onRemove && <Button onClick={onRemove}>Remove</Button>}
            {onAddToCart && (
                <Button disabled={isInCart} onClick={onAddToCart}>{isInCart ? "Already in Cart" : "Add to Cart"}</Button>
            )}
            {/* <Button variant="primary" onClick={() => dispatch(removeFromwishlist(item.id))}>Remove from WishList</Button>
            <Button variant="primary" disabled={isInCart} onClick={() => dispatch(addToCart(item))}>{isInCart ? "Item Already in Cart" : "Add to Cart"}</Button> */}

        </div>
    )
}