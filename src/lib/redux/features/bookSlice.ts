import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {bookList} from "@/data";
import {BookType} from "@/lib/types/types";

type bookStateType = {
    bookList: BookType[]
}

// Define the initial state using that type
const initialState: bookStateType = {
    bookList
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
        removeBook: (state, action: PayloadAction<string>) => {
            const { id } = action.payload
        },
    },
})

export const { addBook, removeBook } = bookSlice.actions

export default bookSlice.reducer