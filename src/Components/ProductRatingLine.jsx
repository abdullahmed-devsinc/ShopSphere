import PropTypes from 'prop-types';
import productShape from '../propTypes/productShape';
import { getAverageRating } from '../utils/productRating';

export default function ProductRatingLine({ product, className }) {
  const avg = getAverageRating(product);
  const empty = avg == null;

  return (
    <p className={className ?? 'card-rating'}>{empty ? 'No Ratings yet' : `${avg} ★`}</p>
  );
}

ProductRatingLine.propTypes = {
  product: productShape.isRequired,
  className: PropTypes.string,
};
