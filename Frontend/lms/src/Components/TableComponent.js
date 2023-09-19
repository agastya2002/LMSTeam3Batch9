/*Code to render Table Component: Here it has been assumed that the first field of table is the unique identifier of a given row*/
import React from "react";

const TableComponent = ({ headerData, tableData, tableActions }) => {
    console.log(tableData.length)
    console.log(tableActions??"HELLO")
    return (
        <table className="table table-responsive table-striped table-bordered table-hover w-auto mx-auto">
            <thead className="table-dark">
                <tr>
                    {
                        headerData.map((val, idx) => <th key={`heading${idx}`}>{val}</th>)
                    }
                    {tableActions? <th>Actions</th>:null}
                </tr>
            </thead>
            <tbody>
                {tableData.length!==0?tableData?.map((val, idx) => (
                    <tr key={`row${idx}`}>
                        {Object.values(val).map((data, idx_data) => <td key={`data${idx_data}`}>{data}</td>)}
                        
                        
                        {tableActions && (<td><ul className="list-inline m-0">{tableActions?.map((data, idx_data) => 
                            <li key={`action${data?.actionName}`} className="list-inline-item">
                                
                            {(data?.actionName==="Edit")?
                                <button key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)} className="btn btn-outline-primary btn-sm">
                                    <i className="bi bi-pencil-square"></i></button>:
                                ((data?.actionName==="Delete")?
                                    (<button key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)} className="btn btn-outline-danger btn-sm">
                                        <i className="bi bi-trash3-fill"></i></button>):
                                    (<button key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)}>{data?.actionName}</button>)
                                    )}
                                    
                            </li>
                        )}</ul></td>)}
                    </tr>
                )):null}
                <tr></tr>
            </tbody>
        </table>
    )
}

export default TableComponent;
