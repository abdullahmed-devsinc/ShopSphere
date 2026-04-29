import { Route, Routes as AppRoutes } from "react-router-dom";
import CartPagePage from "./Pages/CartPage";
import CheckoutSummaryPage from "./Pages/CheckoutSummaryPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductListingPage from "./Pages/ProductListingPage";
import WishlistPage from "./Pages/WishlistPage";
import AddProductPage from "./Pages/AddProductPage";

export default function Routes() {
    return (
        <AppRoutes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutSummaryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPagePage />} />
            <Route path="/addProduct" element={<AddProductPage />} />
            <Route path="*" element={<NotFoundPage />} />

        </AppRoutes>
    );
}