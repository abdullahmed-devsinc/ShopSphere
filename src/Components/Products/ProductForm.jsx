import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { ADD_PRODUCT_CATEGORIES } from '../../Constants/productConstants';

export default function ProductForm({
  formik,
  onPickImage,
  previewUrl,
  loading,
  uploadError,
}) {
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className='error'>{formik.errors.name}</p>
        ) : null}
      </div>

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value=''>Select a category</option>
          {ADD_PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <p className='error'>{formik.errors.category}</p>
        ) : null}
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price ? (
          <p className='error'>{formik.errors.price}</p>
        ) : null}
      </div>

      <div className='form-group'>
        <label>Stock</label>
        <input
          type='number'
          name='stock'
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.stock && formik.errors.stock ? (
          <p className='error'>{formik.errors.stock}</p>
        ) : null}
      </div>

      <div className='form-group'>
        <label>Image</label>
        <input type='file' accept='image/*' onChange={onPickImage} />
        {previewUrl ? (
          <img className='add-product-preview' src={previewUrl} alt='' />
        ) : null}
        {loading ? <p>Uploading...</p> : null}
        {uploadError ? <p className='error'>Upload failed. Try again.</p> : null}
        {formik.errors.img ? <p className='error'>{formik.errors.img}</p> : null}
      </div>

      <Button
        variant='primary'
        type='submit'
        disabled={loading || formik.status?.success}
      >
        {formik.status?.success ? 'Product Added' : 'Add Product'}
      </Button>

      {formik.status?.success ? (
        <Link to='/' className='btn btn-secondary home-link-btn'>
          Return to Home
        </Link>
      ) : null}
    </form>
  );
}

ProductForm.propTypes = {
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    status: PropTypes.object,
  }).isRequired,
  onPickImage: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  uploadError: PropTypes.bool.isRequired,
};
