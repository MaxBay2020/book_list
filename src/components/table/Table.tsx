import styles from './table.module.css'

export type DataType = Record<string, string | number>

export type TableProps = {
    tableHeads: string[],
    tableData: DataType[]
}

const Table = ({tableHeads, tableData}: TableProps) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {
                    tableHeads.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))
                }
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
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default Table;
