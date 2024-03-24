import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {bookList} from "@/data";
import {BookType} from "@/lib/types/types";

type bookStateType = {
    bookList: BookType[],
    removedBookStack: BookType[],
    currentBook: BookType | null
}

// Define the initial state using that type
const initialState: bookStateType = {
    bookList,
    removedBookStack: [],
    currentBook: null
}

export const bookSlice = createSlice({
    name: 'booList',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<{
            newBook: BookType
        }>) => {
            const { newBook } = action.payload
            state.bookList.unshift({
                id: state.bookList.length + 1,
                ...newBook
            })
        },

        removeBook: (state, action: PayloadAction<{
            id: number
        }>) => {
            const { id } = action.payload
            const book = state.bookList.find(book => book.id === id)
            if(book){
                state.removedBookStack.push(book)
            }
            state.bookList = state.bookList.filter(book => book.id!== id)
        },

        undoRemoval: (state) => {
            const top = state.removedBookStack.pop()
            if(top){
                state.bookList.unshift(top)
            }
        },

        setCurrentBook: (state, action: PayloadAction<{
            id: number
        }>) => {
            const { id } = action.payload
            const book = state.bookList.find(book => book.id === id)
            if(book){
                state.currentBook = book
            }
        },

        updateBook: (state, action: PayloadAction<{
            updatedBook: BookType
        }>) => {
            const { updatedBook } = action.payload

            console.log(updatedBook)

            state.bookList = state.bookList.map(book => {
                if(book.id === updatedBook.id){
                    return updatedBook
                }
                return book
            })
        },

        clearCurrentBook: (state) => {
            state.currentBook = null
        }
    },
})

export const {
    addBook,
    removeBook,
    undoRemoval,
    setCurrentBook,
    updateBook,
    clearCurrentBook
} = bookSlice.actions

export default bookSlice.reducer