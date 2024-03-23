'use client'
import styles from './page.module.css'
import {bookTableHeaders, bookList} from "@/data";
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import dynamic from "next/dynamic";
import {useState} from "react";
import useDebounce from "../../customHooks/useDebounce";
import {BookType} from "../../lib/types/types";
import { CiUndo } from "react-icons/ci";
import {undoRemoval} from "../../lib/redux/features/bookSlice";

const Table = dynamic(() => import('@/components/table/Table'), { ssr: false })

const BookListPage = () => {
    const [searchWord, setSearchWord] = useState<string>('')

    const debouncedSearchWord = useDebounce(searchWord, 1)

    const { bookList, removedBookStack } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const filteredbookList = bookList.filter((book: BookType) =>
        book.name.toLowerCase().includes(debouncedSearchWord.toLowerCase())
        ||
        book.category.toLowerCase().includes(debouncedSearchWord.toLowerCase())
    )

    const handleUndoRemoval = () => {
        dispatch(undoRemoval())
    }

    const handleAddBook = () => {

    }

    return (
        <section className={styles.container}>
            <div className={styles.flexBox}>
                {/* search bar */}
                <input
                    type="text"
                    placeholder='search...'
                    className={styles.searchBar}
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                />
                {/* add button */}
                <button className={styles.addButton} onClick={() => handleAddBook()}>
                    Add
                </button>
                {
                    !!removedBookStack.length
                    &&
                    <CiUndo className={styles.undoButton}onClick={() => handleUndoRemoval()}/>
                }
            </div>
            {/* table */}
            <Table
                tableHeads={bookTableHeaders}
                tableData={filteredbookList}
                hasDelete={true}
            />

        </section>
    );
};

export default BookListPage;
