'use client'
import styles from './page.module.css'
import {bookTableHeaders, bookList} from "@/data";
import {useAppSelector} from "../../lib/redux/hooks";
import dynamic from "next/dynamic";
import {useState} from "react";
import useDebounce from "../../customHooks/useDebounce";
import {BookType} from "../../lib/types/types";

const Table = dynamic(() => import('@/components/table/Table'), { ssr: false })

const BookListPage = () => {
    const [searchWord, setSearchWord] = useState('');

    const debouncedSearchWord = useDebounce(searchWord, 1)

    const { bookList } = useAppSelector(state => state.books)

    const filteredbookList = bookList.filter((book: BookType) =>
        book.name.toLowerCase().includes(debouncedSearchWord.toLowerCase())
        ||
        book.category.toLowerCase().includes(debouncedSearchWord.toLowerCase())
    )


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
                <button className={styles.addButton}>Add</button>
            </div>
            {/* table */}
            <Table
                tableHeads={bookTableHeaders}
                tableData={filteredbookList}
            />

        </section>
    );
};

export default BookListPage;
