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
        }
    },
})

export const {
    addBook,
    removeBook,
    undoRemoval
} = bookSlice.actions

export default bookSlice.reducer