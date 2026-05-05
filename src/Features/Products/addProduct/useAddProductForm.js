import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { addProduct } from "../productSlice";
import addProductValidationSchema from "../../../Schema/addProductSchema";
import { useCloudinaryUpload } from "../../../hooks/useCloudinaryUpload";

const initialValues = {
    name: "",
    category: "",
    price: "",
    stock: "",
};

export function useAddProductForm() {
    const dispatch = useDispatch();
    const { uploadImage, loading, error } = useCloudinaryUpload();
    const [imageFile, setImageFile] = useState(null);

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

                dispatch(
                    addProduct({
                        name: values.name,
                        category: values.category,
                        price: Number(values.price),
                        stock: Number(values.stock),
                        img: uploadedUrl,
                        reviews: [],
                    })
                );

                setStatus({ success: true });
                setImageFile(null);
            } catch {
                setStatus({ success: false, uploadError: true });
            }
        },
    });

    const pickImage = (event) => {
        const file = event.target.files?.[0] ?? null;
        setImageFile(file);
        formik.setFieldError("img", undefined);
    };

    return {
        formik,
        imageFile,
        setImageFile,
        pickImage,
        loading,
        error,
    };
}