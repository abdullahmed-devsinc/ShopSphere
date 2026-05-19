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
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const UnAuthoriedPage = lazy(() => import('./Pages/UnAuthorized'));

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
        <Route path='/unauthorized' element={<UnAuthoriedPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/productdetail/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path='/checkout' element={<CheckoutSummaryPage />} />
          <Route path='/wishlist' element={<WishlistPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/add' element={<AddProductPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </AppRoutes>
    </Suspense>
  );
}
