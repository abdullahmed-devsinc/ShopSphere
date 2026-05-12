import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetFilters,
  selectFilteredProducts,
  selectTopRatedProducts,
} from '../Features/Products/productSlice';
import ProductGrid from '../Features/Products/ProductGrid';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../Features/Products/productSlice';
import { useEffect } from 'react';

export default function HomePage() {
  const products = useSelector(selectFilteredProducts);
  const ratedProducts = useSelector(selectTopRatedProducts);
  const featuredProducts = ratedProducts?.slice(0, 4);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    dispatch(setFilters({ category }));
    navigate('/products');
  };

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  return (
    <div className='home-page'>
      <section className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>Welcome to ShopSphere</h1>
          <p className='hero-subtitle'>
            Discover our curated collection of premium products.
          </p>
          <Link to='/products' className='btn btn-primary hero-btn'>
            Shop Now
          </Link>
        </div>
      </section>

      <section className='featured-categories'>
        <h2 className='section-title'>Shop by Category</h2>
        <div className='category-grid'>
          <div
            className='category-card'
            onClick={() => handleCategoryClick('electronics')}
          >
            <div className='category-card-content'>
              <span className='material-symbols-outlined'>devices</span>
              <h3>Electronics</h3>
            </div>
          </div>

          <div className='category-card' onClick={() => handleCategoryClick('fashion')}>
            <div className='category-card-content'>
              <span className='material-symbols-outlined'>checkroom</span>
              <h3>Clothing</h3>
            </div>
          </div>

          <div className='category-card' onClick={() => handleCategoryClick('home')}>
            <div className='category-card-content'>
              <span className='material-symbols-outlined'>home</span>
              <h3>Home & Garden</h3>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className='featured-products'>
          <div className='section-header'>
            <h2 className='section-title'>Featured Products</h2>
            <Link to='/products' className='view-all-link'>
              View All
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>
      )}
    </div>
  );
}
