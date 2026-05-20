import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../Features/Products/productSlice';
import ProductGrid from '../Features/Products/ProductGrid';
import ProductFilter from '../Features/Products/ProductFilter';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../Components/Button';

const ITEMS_PER_PAGE = 12;
export default function ProductListingPage({ isFilterOpen, setIsFilterOpen }) {
  const products = useSelector(selectFilteredProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='product-listing-page'>
      <div
        className={`filter-sidebar-overlay ${isFilterOpen ? 'open' : ''}`}
        onClick={() => setIsFilterOpen(false)}
      />
      <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
        <div className='filter-sidebar__header'>
          <span className='filter-sidebar__title'>Filters</span>
          <button
            className='filter-sidebar__close'
            onClick={() => setIsFilterOpen(false)}
          >
            <span className='material-symbols-outlined'>close</span>
          </button>
        </div>
        <ProductFilter />
      </aside>

      <div className='product-main'>
        <ProductGrid products={paginatedProducts} />
      </div>
      {totalPages > 1 && (
        <div className='pagination'>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className='pagination-info'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {' '}
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

ProductListingPage.propTypes = {
  isFilterOpen: PropTypes.bool,
  setIsFilterOpen: PropTypes.func,
};
