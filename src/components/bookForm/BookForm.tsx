import React from 'react';
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

type UpdateBookFormProps = {
    isUpdate: true,
    currentBook: BookType
}

type CreateBookFormProps = {
    isUpdate: false,
    currentBook?: never
}

type BookFormProps = UpdateBookFormProps | CreateBookFormProps

const BookForm = () => {

    const { currentBook } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BookFormType>({
        resolver: yupResolver(bookSchema)
    })


    const handleAddBook = (newBook: BookFormType) => {
        console.log(newBook)
        // const newBook: BookType = {
        //     name: 'test',
        //     price: '9.9',
        //     description: 'desc',
        //     category: bookCategories[0]
        // }
        // dispatch(addBook({newBook}))
    }

    return (
        <section>
            <form onSubmit={handleSubmit(handleAddBook)} className={styles.container}>
                {
                    currentBook ? <h2>Book ${currentBook?.name}</h2> : <h2>Create New Book</h2>
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
                    Add
                </button>
            </form>
        </section>
    );
};

export default BookForm;
