import styles from './table.module.css'
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import {removeBook} from "../../lib/redux/features/bookSlice";

export type DataType = Record<string, any>

export type TableProps = {
    tableHeads: string[],
    tableData: DataType[],
    hasDelete?: boolean
}

const Table = ({tableHeads, tableData, hasDelete = false}: TableProps) => {

    const dispatch = useAppDispatch()

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
                            tableHeads.map(key => {
                                if(typeof row[key] === 'object'){
                                    return <td key={key}>{row[key].name}</td>
                                }else {
                                    return <td key={key}>{row[key]}</td>
                                }
                            })
                        }
                        {
                            hasDelete
                            &&
                            <td>
                                <button className={styles.deleteButton} onClick={() => deleteBookById(+row.id)}>
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
