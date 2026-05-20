import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addReview } from '../Features/Products/productSlice';
import Button from './Button';
import { reviewShape } from '../propTypes/productShape';

export default function ProductReviews({ productId, reviews }) {
  const dispatch = useDispatch();
  const list = Array.isArray(reviews) ? reviews : [];

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    setFormError('');
    dispatch(
      addReview({
        productId,
        review: { author, rating: Number(rating) },
      }),
    );
    setAuthor('');
    setRating(5);
  };

  return (
    <section className='product-reviews'>
      <h2 className='product-reviews__title'>Customer reviews</h2>

      <div className='product-reviews__container'>
        <div className='product-reviews__list'>
          {list.length === 0 && (
            <p className='page-description'>No ratings yet — be the first.</p>
          )}

          {list.map((r) => (
            <article key={r.id} className='product-review'>
              <div className='product-review__meta'>
                <span className='product-review__author'>{r.author}</span>
                <span className='product-review__rating'>★ {r.rating}</span>
                {r.createdAt && (
                  <span className='product-review__date'>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className='product-reviews__form-wrapper'>
          <form className='product-reviews__form' onSubmit={handleSubmit}>
            <h3 className='product-reviews__form-title'>Rate this product</h3>
            <div className='product-reviews__form-row'>
              <input
                type='text'
                placeholder='Your name'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='app-input'
              />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className='app-input'
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} stars
                  </option>
                ))}
              </select>
            </div>
            {formError && <p className='error'>{formError}</p>}
            <Button variant='primary' type='submit'>
              Post rating
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

ProductReviews.propTypes = {
  productId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewShape),
};
