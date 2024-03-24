import styles from './table.module.css'
import {useAppDispatch, useAppSelector} from "../../lib/redux/hooks";
import {removeBook, setCurrentBook} from "../../lib/redux/features/bookSlice";
import React from "react";

export type DataType = Record<string, any>

export type TableProps = {
    tableHeads: string[],
    tableData: DataType[],
    hasDelete?: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Table = ({tableHeads, tableData, hasDelete = false, setShow}: TableProps) => {

    const dispatch = useAppDispatch()

    const deleteBookById = (e: React.MouseEvent<HTMLElement>, id: number) => {
        e.stopPropagation()
        dispatch(removeBook({
            id
        }))
    }

    const handleClickRow = (id: any) => {
        setShow(true)
        dispatch(setCurrentBook({ id }))
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
                    <tr key={index} onClick={() => handleClickRow(row.id)} className={styles.eachRow}>
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
                                <button className={styles.deleteButton} onClick={(e: React.MouseEvent<HTMLElement>) => deleteBookById(e, +row.id)}>
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
