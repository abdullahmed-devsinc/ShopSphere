import PropTypes from "prop-types";
import productShape from "../propTypes/productShape";
import ProductCardContainer from "../Features/Products/ProductsCardContainter";

export default function SimilarProductRow({ products }) {
    if (!products?.length)
        return null;

    return (
        <section className="similar-products">
            <h2 className="similar-products__title">You may also like</h2>
            <div className="similar-products__scroll">
                {products.map((product) => (
                    <div className="similar-products__cell" key={product.id}>
                        <ProductCardContainer product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}

SimilarProductRow.propTypes = {
    products: PropTypes.arrayOf(productShape),
};