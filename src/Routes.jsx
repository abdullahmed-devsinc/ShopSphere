import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Navbar from './Components/Navbar';
import Breadcrumbs from './Components/Breadcrumbs';
import ScrollToTop from './Components/ScrollToTop';
import ProtectedRoute from './Components/ProtectedRoute';
import ErrorPage from './Pages/ErrorPage';
import NotFoundPage from './Pages/NotFoundPage';

const CartPage = lazy(() => import('./Pages/CartPage'));
const CheckoutSummaryPage = lazy(() => import('./Pages/CheckoutSummaryPage'));
const ProductDetailPage = lazy(() => import('./Pages/ProductDetailPage'));
const ProductListingPage = lazy(() => import('./Pages/ProductListingPage'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const WishlistPage = lazy(() => import('./Pages/WishlistPage'));
const AddProductPage = lazy(() => import('./Pages/AddProductPage'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const UnAuthorized = lazy(() => import('./Pages/UnAuthorized'));

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className='app-shell'>
        <div className='app-bg' />
        <div className='app-content'>
          <ScrollToTop />
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path='/' element={<HomePage />} />

      <Route path='/products' element={<ProductListingPage />} />
      <Route path='/unauthorized' element={<UnAuthorized />} />
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
    </Route>,
  ),
);

export default function Routes() {
  return (
    <Suspense fallback={<div className='page'>Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
