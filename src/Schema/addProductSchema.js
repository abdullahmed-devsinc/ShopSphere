import * as Yup from 'yup'
export const addProductValidationSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    price: Yup.number().required('Product Price is required').min("Price must be greator than zero"),
    category: Yup.string().required('Product Rating is Required'),
    stock: Yup.number().required('Product Stock is required').min(0, "Stock can't be negative"),
    rating: Yup.number().required('Product Rating is required').min(0, "Rating can't be less than zero").max(5, "Rating can't be more than 5"),
    img: Yup.string().required("Please upload an image")

})