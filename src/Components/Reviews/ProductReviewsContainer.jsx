import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addReview } from "../Products/productSlice";
import { reviewShape } from "../../propTypes/productShape";
import { useReviewForm } from "./useReviewForm";
import ProductReviewList from "../../Components/Reviews/ProductReviewList";
import ProductReviewForm from "../../Components/Reviews/ProductReviewForm";

export default function ProductReviewsContainer({ productId, reviews }) {
    const dispatch = useDispatch();
    const list = Array.isArray(reviews) ? reviews : [];

    const { author, rating, formError, setAuthor, setRating, handleSubmit } = useReviewForm(
        (review) => dispatch(addReview({ productId, review }))
    );

    return (
        <section className="product-reviews">
            <h2 className="product-reviews__title">Customer reviews</h2>

            <ProductReviewList reviews={list} />

            <ProductReviewForm
                author={author}
                rating={rating}
                formError={formError}
                onAuthorChange={setAuthor}
                onRatingChange={setRating}
                onSubmit={handleSubmit}
            />
        </section>
    );
}

ProductReviewsContainer.propTypes = {
    productId: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(reviewShape),
};