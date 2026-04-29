import PropTypes from 'prop-types';
const productShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    img: PropTypes.string,
});

export default productShape;
