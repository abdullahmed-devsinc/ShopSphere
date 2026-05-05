import { useAddProductForm } from "../Features/Products/addProduct/useAddProductForm";
import { useImagePreview } from "../hooks/useImagePreview";
import ProductForm from "../Components/Products/ProductForm";

export default function AddProductPage() {
    const { formik, imageFile, pickImage, loading, error } = useAddProductForm();
    const previewUrl = useImagePreview(imageFile);

    return (
        <div className="add-product-page">
            <h1>Add Product</h1>

            <ProductForm
                formik={formik}
                onPickImage={pickImage}
                previewUrl={previewUrl}
                loading={loading}
                uploadError={Boolean(error || formik.status?.uploadError)}
            />
        </div>
    );
}