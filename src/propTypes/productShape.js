import PropTypes from 'prop-types';

const reviewShape = PropTypes.shape({
  id: PropTypes.string,
  author: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  createdAt: PropTypes.string,
});

const productShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  img: PropTypes.string,
  reviews: PropTypes.arrayOf(reviewShape),
});

export default productShape;
export { reviewShape };
