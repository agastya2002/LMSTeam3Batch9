/*Code to render Table Component: Here it has been assumed that the first field of table is the unique identifier of a given row*/
import React from "react";

const TableComponent = ({ headerData, tableData, tableActions }) => {
    console.log(tableData.length)
    return (
        <table>
            <thead>
                <tr>
                    {
                        headerData.map((val, idx) => <th key={`heading${idx}`}>{val}</th>)
                    }
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData.length!==0?tableData?.map((val, idx) => (
                    <tr key={`row${idx}`}>
                        {Object.values(val).map((data, idx_data) => <td key={`data${idx_data}`}>{data}</td>)}
                        {tableActions?.length !== 0 ? <td>{tableActions?.map((data, idx_data) => <button key={`action_${data?.actionName}`} data-entry-obj={val} onClick={data?.actionCallback}>{data?.actionName}</button>)}</td> : null}
                    </tr>
                )):null}
                <tr></tr>
            </tbody>
        </table>
    )
}

export default TableComponent;
