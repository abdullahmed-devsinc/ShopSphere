import PropTypes from 'prop-types';
import productShape from "../../propTypes/productShape";
import ProductCardContainer from './ProductsCardContainter';

export default function ProductGrid({ products }) {
    return (
        <div className="product-grid">
            {products.map(product =>
                <ProductCardContainer key={product.id} product={product} />
            )}
        </div>
    )
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(productShape).isRequired,
};