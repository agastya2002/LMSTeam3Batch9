import React from "react";

const TableComponent = ({ headerData, tableData, tableActions }) => {
    return (
        <table>
            <thead>
                <tr>
                    {
                        headerData.map((val, idx) => <th key={`heading${idx}`}>{val}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {tableData?.map((val, idx) => (
                    <tr key={`row${idx}`}>
                        {Object.keys(val).map((data, idx_data) => <td key={`data${idx_data}`}>{data}</td>)}
                        {tableActions.length !== 0 ? <td>{tableActions?.map((data, idx_data) => <button key={`action_${data?.actionName}`} data-entry-id={Object.keys(val)[0]} onClick={data?.actionCallback}>{data?.actionName}</button>)}</td> : null}
                    </tr>
                ))}
                <tr></tr>
            </tbody>
        </table>
    )
}

export default TableComponent;
