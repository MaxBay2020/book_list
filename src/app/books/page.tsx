'use client'
import React, {useState} from 'react';
// import Table from "@/components/table/Table";
import {bookTableHeaders, bookList} from "@/data";
import {useAppSelector} from "../../lib/redux/hooks";
import dynamic from "next/dynamic";

const Table = dynamic(() => import('@/components/table/Table'), { ssr: false })

const BookListPage = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { bookList } = useAppSelector(state => state.books)

    return (
        <section>
            <Table
                tableHeads={bookTableHeaders}
                tableData={bookList}
            />
        </section>
    );
};

export default BookListPage;
