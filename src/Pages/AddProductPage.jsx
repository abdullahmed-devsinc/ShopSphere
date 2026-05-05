import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addProduct } from "../Features/Products/productSlice";
import { useFormik } from "formik";
import addProductValidationSchema from "../Schema/addProductSchema";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const initialValues = {
    name: "",
    category: "",
    price: "",
    stock: "",
};

export default function AddProductPage() {
    const dispatch = useDispatch();
    const { uploadImage, loading, error } = useCloudinaryUpload();
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl("");
            return;
        }
        const url = URL.createObjectURL(imageFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    const formik = useFormik({
        initialValues,
        validationSchema: addProductValidationSchema,
        onSubmit: async (values, { setStatus, setFieldError }) => {
            if (!imageFile) {
                setFieldError("img", "Please choose an image");
                return;
            }
            setStatus(undefined);
            try {
                const uploadedUrl = await uploadImage(imageFile);
                const newProduct = {
                    name: values.name,
                    category: values.category,
                    price: Number(values.price),
                    stock: Number(values.stock),
                    img: uploadedUrl,
                    reviews: [],
                };
                dispatch(addProduct(newProduct));
                setStatus({ success: true });
                setImageFile(null);
            } catch {
                setStatus({ success: false, uploadError: true });
            }
        },
    });

    const handlePickImage = (e) => {
        const file = e.target.files?.[0];
        setImageFile(file ?? null);
        formik.setFieldError("img", undefined);
    };

    return (
        <div className="add-product-page">
            <h1>Add Product</h1>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="error">{formik.errors.name}</p>
                    )}
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
                    {formik.touched.category && formik.errors.category && (
                        <p className="error">{formik.errors.category}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.price && formik.errors.price && (
                        <p className="error">{formik.errors.price}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.stock && formik.errors.stock && (
                        <p className="error">{formik.errors.stock}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="file" accept="image/*" onChange={handlePickImage} />
                    {formik.errors.img && <p className="error">{formik.errors.img}</p>}
                    {previewUrl && (
                        <img className="add-product-preview" src={previewUrl} alt="" />
                    )}
                    {loading && <p>Uploading…</p>}
                    {(error || formik.status?.uploadError) && (
                        <p className="error">Upload failed. Try again.</p>
                    )}
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading || formik.status?.success}
                >
                    {formik.status?.success ? "Product Added" : "Add Product"}
                </Button>
                {formik.status?.success && (
                    <Link to="/" className="btn btn-secondary home-link-btn">
                        Return to Home
                    </Link>
                )}
            </form>
        </div>
    );
}
