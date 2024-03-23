
export type DataType = Record<string, string | number>

export type TableProps = {
    tableHeads: string[],
    tableData: DataType[]
}

const Table = ({tableHeads, tableData}: TableProps) => {
    return (
        <table>
            <tr>
                {
                    tableHeads.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))
                }
            </tr>
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
        </table>
    );
};

export default Table;
