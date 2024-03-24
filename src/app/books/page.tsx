'use client'
import styles from './page.module.css'
import {bookTableHeaders, bookList} from "@/data";
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import dynamic from "next/dynamic";
import {useState} from "react";
import useDebounce from "../../customHooks/useDebounce";
import {BookType} from "../../lib/types/types";
import { CiUndo } from "react-icons/ci";
import {clearCurrentBook, undoRemoval} from "../../lib/redux/features/bookSlice";
import {useRouter} from "next/navigation";
import Modal from "../../components/modal/Modal";
import BookForm from "../../components/bookForm/BookForm";
import {Metadata} from "next";

const Table = dynamic(() => import('@/components/table/Table'), { ssr: false })

const BookListPage = () => {
    const [searchWord, setSearchWord] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const debouncedSearchWord = useDebounce(searchWord, 1)

    const { bookList, removedBookStack } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const filteredbookList = bookList.filter((book: BookType) =>
        book.name.toLowerCase().includes(debouncedSearchWord.toLowerCase())
        ||
        book.category.name.toLowerCase().includes(debouncedSearchWord.toLowerCase())
    )

    const handleUndoRemoval = () => {
        dispatch(undoRemoval())
    }

    const handleAddBook = () => {
        setShow(true)
    }

    const handleCloseModal = () => {
        dispatch(clearCurrentBook())
        setShow(false)
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
                setShow={setShow}
            />

            {/* book modal */}
            <Modal
                show={show}
                onClose={() => handleCloseModal()}
            >
                <BookForm setShow={setShow} />
            </Modal>

        </section>
    );
};

export default BookListPage;
