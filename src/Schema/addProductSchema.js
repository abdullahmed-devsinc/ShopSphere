import * as Yup from 'yup'
const addProductValidationSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    price: Yup.number().required('Product Price is required').min(0, "Price must be greator than zero"),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().required('Product Stock is required').min(0, "Stock can't be negative"),
})
export default addProductValidationSchema;