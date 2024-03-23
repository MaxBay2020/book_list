import styles from './table.module.css'
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import {removeBook} from "../../lib/redux/features/bookSlice";

export type DataType = Record<string, string | number>

export type TableProps = {
    tableHeads: string[],
    tableData: DataType[],
    hasDelete?: boolean
}

const Table = ({tableHeads, tableData, hasDelete = false}: TableProps) => {

    const dispatch = useAppDispatch()
    const { bookList, removedBookStack } = useAppSelector(state => state.books)
    console.log(bookList)
    console.log(removedBookStack)

    const deleteBookById = (id: number) => {
        dispatch(removeBook({
            id
        }))
    }

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {
                    tableHeads.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))
                }
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                tableData.map((row, index) => (
                    <tr key={index}>
                        {
                            tableHeads.map(key => (
                                <td key={key}>{row[key]}</td>
                            ))
                        }
                        {
                            hasDelete
                            &&
                            <td>
                                <button className={styles.deleteButton} onClick={() => deleteBookById(row.id)}>
                                    Delete
                                </button>
                            </td>
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default Table;
