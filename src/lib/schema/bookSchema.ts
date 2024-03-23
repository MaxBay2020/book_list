import {number, object, string} from "yup";


const bookSchema = object({
    name: string().trim().min(1).required(),
    price: number().positive('Price has to be positive').typeError('Price required').required(),
    category: string().trim().required(),
    description: string().trim().min(1).required()
})


export default bookSchema