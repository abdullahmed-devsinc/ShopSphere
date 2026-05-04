import { useDispatch } from "react-redux";
import { addProduct } from "../Features/Products/productSlice";
import { useFormik } from "formik";
import addProductValidationSchema from "../Schema/addProductSchema";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const initialValues = {
    name: '',
    category: '',
    price: '',
    rating: '',
    img: '',
    stock: '',
}

export default function AddProductPage() {
    const dispatch = useDispatch();
    const { uploadImage, loading, error } = useCloudinaryUpload();
    const formik = useFormik({
        initialValues,
        validationSchema: addProductValidationSchema,
        onSubmit: (values, { resetForm, setStatus }) => {
            const newProduct = {
                name: values.name,
                category: values.category,
                price: Number(values.price),
                rating: Number(values.rating),
                stock: Number(values.stock),
                img: values.img
            }
            dispatch(addProduct(newProduct))
            setStatus({ success: true })
        }
    })
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        const url = await uploadImage(file)
        formik.setFieldValue('img', url)

    }
    return (
        <div className="add-product-page">
            <h1>Add Product</h1>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="home">Home</option>
                        <option value="fashion">Fashion</option>
                        <option value="grocery">Grocery</option>
                        <option value="books">Books</option>
                        <option value="sports">Sports</option>
                        <option value="beauty">Beauty</option>
                    </select>
                    {formik.touched.category && formik.errors.category && <p className="error">{formik.errors.category}</p>}
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.price && formik.errors.price && <p className="error">{formik.errors.price}</p>}
                </div>

                <div className="form-group">
                    <label>Rating (0-5)</label>
                    <input
                        type="number"
                        name="rating"
                        min="0"
                        max="5"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.rating && formik.errors.rating && <p className="error">{formik.errors.rating}</p>}
                </div>

                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.stock && formik.errors.stock && <p className="error">{formik.errors.stock}</p>}
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {loading && <p>Uploading...</p>}
                    {error && <p className="error">Upload failed. Try again.</p>}
                    {formik.values.img && (
                        <img src={formik.values.img} alt="preview" width={100} />
                    )}
                    {formik.touched.img && formik.errors.img && <p className="error">{formik.errors.img}</p>}
                </div>

                <Button variant="primary" disabled={loading || formik.status?.success} >
                    {formik.status?.success ? "Product Added" : "Add Product"}
                </Button>
                {formik.status?.success &&
                    <Link to='/'>
                        Home
                    </Link>}

            </form>
        </div>
    )
}