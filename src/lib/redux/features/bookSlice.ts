import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {bookList} from "@/data";
import {BookType} from "@/lib/types/types";

type bookStateType = {
    bookList: BookType[],
    removedBookStack: BookType[]
}

// Define the initial state using that type
const initialState: bookStateType = {
    bookList,
    removedBookStack: []
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
            state.bookList.push(newBook)
        },

        removeBook: (state, action: PayloadAction<{
            id: number
        }>) => {
            const { id } = action.payload
            state.removedBookStack.push(state.bookList.find(book => book.id === id))
            state.bookList = state.bookList.filter(book => book.id!== id)
        },

        undoRemoval: (state) => {
            const top = state.removedBookStack.pop()
            state.bookList.unshift(top)
        }
    },
})

export const {
    addBook,
    removeBook,
    undoRemoval
} = bookSlice.actions

export default bookSlice.reducer