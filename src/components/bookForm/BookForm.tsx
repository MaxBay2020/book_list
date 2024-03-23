import React from 'react';
import {BookType} from "../../lib/types/types";
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import styles from './bookForm.module.css'
import {bookCategories} from "../../data";
import {addBook} from "../../lib/redux/features/bookSlice";

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

    const handleAddBook = () => {
        const newBook: BookType = {
            name: 'test',
            price: '9.9',
            description: 'desc',
            category: bookCategories[0]
        }
        dispatch(addBook({newBook}))
    }

    return (
        <section className={styles.container}>
            {
                currentBook ? <h2>Book ${currentBook?.name}</h2> : <h2>Create New Book</h2>
            }
            <input type="text" placeholder='book name'/>
            <input type="number" placeholder='book price'/>
            <select name="category" id="bookCategory">
                {
                    bookCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))
                }
            </select>
            <textarea name="bookDesc" id="bookDesc" cols={30} rows={5} placeholder='book description' />
            <button className={styles.addButton} onClick={() => handleAddBook()}>
                Add
            </button>
        </section>
    );
};

export default BookForm;
