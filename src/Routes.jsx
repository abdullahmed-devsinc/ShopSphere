import { Route, Routes as AppRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';
const CartPage = lazy(() => import('./Pages/CartPage'));
const CheckoutSummaryPage = lazy(() => import('./Pages/CheckoutSummaryPage'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'));
const ProductDetailPage = lazy(() => import('./Pages/ProductDetailPage'));
const ProductListingPage = lazy(() => import('./Pages/ProductListingPage'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const WishlistPage = lazy(() => import('./Pages/WishlistPage'));
const AddProductPage = lazy(() => import('./Pages/AddProductPage'));

export default function Routes({ isFilterOpen, setIsFilterOpen }) {
  return (
    <Suspense fallback={<div className='page'>Loading…</div>}>
      <AppRoutes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/products'
          element={
            <ProductListingPage
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          }
        />
        <Route path='/productdetail/:id' element={<ProductDetailPage />} />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute allowedRoutes={['user']}>
              <CheckoutSummaryPage />
            </ProtectedRoute>
          }
        />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route
          path='/add'
          element={
            <ProtectedRoute allowedRoutes={['admin']}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </AppRoutes>
    </Suspense>
  );
}
