import PropTypes from "prop-types";
import { reviewShape } from "../../propTypes/productShape";

export default function ProductReviewList({ reviews }) {
    if (!reviews.length) {
        return <p className="page-description">No ratings yet — be the first.</p>;
    }

    return (
        <>
            {reviews.map((r) => (
                <article key={r.id} className="product-review">
                    <div className="product-review__meta">
                        <span className="product-review__author">{r.author}</span>
                        <span className="product-review__rating">★ {r.rating}</span>
                        {r.createdAt ? (
                            <span className="product-review__date">
                                {new Date(r.createdAt).toLocaleDateString()}
                            </span>
                        ) : null}
                    </div>
                </article>
            ))}
        </>
    );
}

ProductReviewList.propTypes = {
    reviews: PropTypes.arrayOf(reviewShape).isRequired,
};