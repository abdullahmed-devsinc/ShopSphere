import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button";
import FormField from "../Forms/FormField";
import { ADD_PRODUCT_CATEGORIES } from "../../Constants/productConstants";

export default function ProductForm({
    formik,
    onPickImage,
    previewUrl,
    loading,
    uploadError,
}) {
    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <FormField label="Name" error={formik.touched.name ? formik.errors.name : undefined}>
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </FormField>

            <FormField label="Category" error={formik.touched.category ? formik.errors.category : undefined}>
                <select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Select a category</option>
                    {ADD_PRODUCT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </FormField>

            <FormField label="Price" error={formik.touched.price ? formik.errors.price : undefined}>
                <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </FormField>

            <FormField label="Stock" error={formik.touched.stock ? formik.errors.stock : undefined}>
                <input
                    type="number"
                    name="stock"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </FormField>

            <FormField label="Image" error={formik.errors.img}>
                <input type="file" accept="image/*" onChange={onPickImage} />
                {previewUrl ? <img className="add-product-preview" src={previewUrl} alt="" /> : null}
                {loading ? <p>Uploading...</p> : null}
                {uploadError ? <p className="error">Upload failed. Try again.</p> : null}
            </FormField>

            <Button variant="primary" type="submit" disabled={loading || formik.status?.success}>
                {formik.status?.success ? "Product Added" : "Add Product"}
            </Button>

            {formik.status?.success ? (
                <Link to="/" className="btn btn-secondary home-link-btn">
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