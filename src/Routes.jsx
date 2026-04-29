import { Route, Routes as AppRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
const CartPage = lazy(() => import("./Pages/CartPage"))
const CheckoutSummaryPage = lazy(() => import("./Pages/CheckoutSummaryPage"))
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"))
const ProductDetailPage = lazy(() => import("./Pages/ProductDetailPage"))
const ProductListingPage = lazy(() => import("./Pages/ProductListingPage"))
const WishlistPage = lazy(() => import("./Pages/WishlistPage"))
const AddProductPage = lazy(() => import("./Pages/AddProductPage"))

export default function Routes() {
    return (
        <Suspense>
            <AppRoutes>
                <Route path="/" element={<ProductListingPage />} />
                <Route path="/productdetail/:id" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutSummaryPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/addProduct" element={<AddProductPage />} />
                <Route path="*" element={<NotFoundPage />} />

            </AppRoutes>
        </Suspense>
    );
}