import PropTypes from 'prop-types';
import ProductCard from "./ProductCard";
import productShape from "../../propTypes/productShape";

export default function ProductGrid({ products }) {
    return (
        <div className="product-grid">
            {products.map(product =>
                <ProductCard key={product.id} product={product} />
            )}
        </div>
    )
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(productShape).isRequired,
};