import React, { useEffect, useState } from "react";
import axios from 'axios';
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import NavbarCust from "../Components/NavbarCust";

export const CustomerItemsPurchased = () => {



    const [items,setItems] = useState([])

    
    const baseURL = "https://localhost:7223/api/customer"

    const getItems = async (token, user) => {
        try{
        const resp = await axios.get(`${baseURL}/GetPurchasedItems?id=${user.userId}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        setItems(resp.data.map((o)=>({...o,['returnDate']:o['returnDate'].substring(0,10)})))
      }catch(err){
        console.log(err)
      }
    }
    useEffect(() => {
      const sessionToken=sessionStorage.getItem('token');
      const sessionUser=JSON.parse(sessionStorage.getItem('user'));
      getItems(sessionToken, sessionUser);
    }, []);

    return (
      <div>
        <NavbarCust/>
        <h2 style={{padding:"10px"}}>Items Purchased</h2>
        <TableComponent headerData={["Issue ID","Item Description","Item Make","Item Category","Item Valuation", "Return Date"]} tableData={responseFilter(items,["itemId","itemDescription","itemMake","itemCategory","itemValuation", "returnDate"])}/>
           
      </div>
    );
};
