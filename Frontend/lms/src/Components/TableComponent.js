/*Code to render Table Component: Here it has been assumed that the first field of table is the unique identifier of a given row*/
import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableComponent = ({ headerData, tableData, tableActions }) => {
    console.log(tableData.length)
    console.log(tableActions??"HELLO")
    return (
        <Table striped bordered hover responsive className="w-auto mx-auto">
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
                                <Button variant="outline-primary" size="sm" key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)}>
                                    <i className="bi bi-pencil-square"></i></Button>:
                                ((data?.actionName==="Delete")?
                                    (<Button variant="outline-danger" size="sm" key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)}>
                                        <i className="bi bi-trash3-fill"></i></Button>):
                                    (<Button key={`action_${data?.actionName}`} data-entry-obj={val} onClick={()=>data?.actionCallback(val)}>{data?.actionName}</Button>)
                                    )}
                                    
                            </li>
                        )}</ul></td>)}
                    </tr>
                )):null}
                <tr></tr>
            </tbody>
        </Table>
    )
}

export default TableComponent;
