import { Route, Routes as AppRoutes } from "react-router-dom";
import CartPagePage from "./Pages/CartPage";
import CheckoutSummaryPage from "./Pages/CheckoutSummaryPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductListingPage from "./Pages/ProductListingPage";
import wishlistPage from "./Pages/wishlistPage";

export default function Routes() {
    return (
        <AppRoutes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/productdetail" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutSummaryPage />} />
            <Route path="/wishlist" element={<wishlistPage />} />
            <Route path="/cart" element={<CartPagePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </AppRoutes>
    );
}