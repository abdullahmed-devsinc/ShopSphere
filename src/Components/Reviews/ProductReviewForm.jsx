import PropTypes from "prop-types";
import Button from "../Button";
import { REVIEW_RATING_OPTIONS } from "../../Constants/productConstants";

export default function ProductReviewForm({
    author,
    rating,
    formError,
    onAuthorChange,
    onRatingChange,
    onSubmit,
}) {
    return (
        <form className="product-reviews__form" onSubmit={onSubmit}>
            <h3 className="product-reviews__form-title">Rate this product</h3>

            <div className="product-reviews__form-row">
                <input
                    type="text"
                    placeholder="Your name"
                    value={author}
                    onChange={(e) => onAuthorChange(e.target.value)}
                />

                <select value={rating} onChange={(e) => onRatingChange(Number(e.target.value))}>
                    {REVIEW_RATING_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                            {n} stars
                        </option>
                    ))}
                </select>
            </div>

            {formError ? <p className="error">{formError}</p> : null}

            <Button variant="primary" type="submit">
                Post rating
            </Button>
        </form>
    );
}

ProductReviewForm.propTypes = {
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    formError: PropTypes.string,
    onAuthorChange: PropTypes.func.isRequired,
    onRatingChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};