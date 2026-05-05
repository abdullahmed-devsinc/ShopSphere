import { Link } from "react-router-dom";
import CartItem from "../Features/Cart/CartItem";
import PageHeader from "../Components/Common/PageHeader";
import EmptyState from "../Components/Common/EmptyState";
import OrderSummary from "../Components/Cart/OrderSummary";
import { useCartSummary } from "../hooks/useCartSummary";

export default function CartPage() {
    const { items, subTotal, cartCount } = useCartSummary();

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <PageHeader
                    title="Your cart"
                    description="Items you add appear here."
                />
                <EmptyState
                    icon="shopping_cart"
                    title="Your cart is empty"
                    message="Add products from the catalog — they will show up in this list."
                    action={<Link to="/" className="btn btn-primary">Browse products</Link>}
                />
            </div>
        );
    }

    return (
        <div className="cart-page">
            <PageHeader
                title="Your cart"
                description={`${items.length} ${items.length === 1 ? "product" : "products"} · ${cartCount} ${cartCount === 1 ? "item" : "items"} total`}
                right={
                    <Link to="/" className="page-header-link">
                        <span className="material-symbols-outlined page-header-link-icon">arrow_back</span>
                        Continue shopping
                    </Link>
                }
            />

            <div className="cart-layout">
                <div className="cart-main">
                    <div className="cart-items-panel">
                        <div className="cart-list">
                            {items.map((item) => <CartItem key={item.id} item={item} />)}
                        </div>
                    </div>
                </div>

                <OrderSummary
                    subtotal={subTotal}
                    totalLabel="Estimated total"
                    totalAmount={subTotal}
                    shippingLabel="Calculated at checkout"
                    note="Taxes are calculated on the checkout page."
                />

                <Link to="/checkout" className="btn btn-primary cart-summary-cta">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    );
}