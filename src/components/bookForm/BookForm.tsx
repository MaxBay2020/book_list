import React, {useEffect} from 'react';
import {BookType} from "@/lib/types/types";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import styles from './bookForm.module.css'
import {bookCategories} from "@/data";
import {addBook} from "@/lib/redux/features/bookSlice";
import {useForm} from "react-hook-form";
import bookSchema from "@/lib/schema/bookSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import Alert from "../alert/Alert";
import {BookFormType} from "../../lib/types/types";
import {clearCurrentBook, updateBook} from "../../lib/redux/features/bookSlice";


export type BookFormProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const BookForm = ({ setShow }: BookFormProps) => {

    const { currentBook } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<BookFormType>({
        resolver: yupResolver(bookSchema)
    })

    useEffect(() => {
        if(currentBook){
            setValue('name', currentBook.name)
            setValue('price', currentBook.price)
            setValue('category', currentBook.category.id)
            setValue('description', currentBook.description)
        }
    }, [currentBook])



    const handleAddBook = (bookForm: BookFormType) => {
        const {
            name,
            price,
            category,
            description
        } = bookForm

        const categoryFound = bookCategories.find(c => c.id === +category)
        if(!categoryFound){
            return
        }

        if(currentBook){
            // update book
            const updatedBook: BookType = {
                ...currentBook,
                name,
                price: price.toString(),
                category: categoryFound,
                description
            }


            dispatch(updateBook({ updatedBook }))
            dispatch(clearCurrentBook())
            setShow(false)
        }else{
            // create book
            const newBook: BookType = {
                name,
                price: price.toString(),
                category: categoryFound,
                description
            }
            dispatch(addBook({newBook}))
            reset()
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit(handleAddBook)} className={styles.container}>
                {
                    currentBook ? <h2>📖 {currentBook?.name}</h2> : <h2>Create New Book</h2>
                }

                {/* book name field */}
                <input type="text" placeholder='book name' {...register('name')} />
                { errors.name && <Alert severity='error'>{errors.name.message}</Alert> }

                {/* book price field */}
                <input type="number" step={0.01} placeholder='book price' {...register('price')} />
                { errors.price && <Alert severity='error'>{errors.price.message}</Alert> }

                {/* book category field */}
                <select id="bookCategory" {...register('category')} >
                    {
                        bookCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                { errors.category &&  <Alert severity='error'>{errors.category.message}</Alert> }


                {/* book description field */}
                <textarea id="bookDesc" cols={30} rows={5} placeholder='book description' {...register('description')} />
                { errors.description && <Alert severity='error'>{errors.description.message}</Alert> }

                {/* submit button */}
                <button type='submit' className={styles.addButton} >
                    {currentBook ? 'Update' : 'Add'}
                </button>
            </form>
        </section>
    );
};

export default BookForm;
