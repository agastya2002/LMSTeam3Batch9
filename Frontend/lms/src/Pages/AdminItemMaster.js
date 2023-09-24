import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Button, Container, Row, Col, Form, Card, FormSelect } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import NavbarAdmin from "../Components/NavbarAdmin";

export const AdminItemMaster = () => {

  const [items, setItems] = useState([])
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState("furniture");
  const [status, setStatus] = useState("Y");
  const [make, setMake] = useState("wood");
  const [itemId, setItemId] = useState('')
  const [desc, setDesc] = useState('')
  const [valuation, setValuation] = useState('')
  const [edit, setEdit] = useState(false)

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleItemStatus = (event) => {
    setStatus(event.target.value);
  }

  const handleItemMake = (event) => {
    setMake(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ItemId: itemId,
      ItemDescription: desc,
      ItemValuation: valuation,
      IssueStatus: status,
      ItemMake: make,
      ItemCategory: category
    }

    try {
      const resp = await axios.put(`${baseURL}/UpdateItem`, data, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(resp)
      if (resp.status == 200) {
        swal("Edit Successfull", "Item Details have been edited successfully", "success")
        const editedItems = items.filter(i => i.itemId != data.ItemId)
        setItems([...editedItems, { itemId: data.ItemId, itemDescription: data.ItemDescription, itemValuation: data.ItemValuation, issueStatus: data.IssueStatus, itemMake: data.ItemMake, itemCategory: data.ItemCategory }])
      }
    } catch (err) {
      swal("Edit Not Successful", "Something Unexpected occured.Please try again!", "error")
      console.log(err)
    }

  }

  const baseURL = "https://localhost:7223/api/admin"
  // const { token } = useAuth();
  const [token, setToken] = useState("init val");

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    setToken(sessionToken);
    getItems(sessionToken);
  }, [])

  const getItems = async (token) => {
    try {
      const resp = await axios.get(`${baseURL}/GetItems`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(resp)
      setItems(resp.data)
    } catch (err) {
      swal("Failed Items Fetch", "Something Unexpected occured.Please try again!", "error")
      console.log(err)
    }
  }

  const editItems = (val) => {
    setItemId(val.itemId)
    setDesc(val.itemDescription)
    setCategory(val.itemCategory)
    setMake(val.itemMake)
    setValuation(val.itemValuation)
    setStatus(val.issueStatus)
    setEdit(true)
  }
  const deleteItem = async (val) => {
    console.log(val)
    try {
      const resp = await axios.delete(`${baseURL}/DeleteItemById?id=${val.itemId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(resp)
      if (resp.status == 200) {
        swal("Delete Successful", "The Item details has been deleted succesfully", "success")
        const editedItems = items.filter(item => item.itemId !== val.itemId);
        setItems(editedItems);
      }
    } catch (err) {
      swal("Delete not succesfull", "Some unexpected error occured, please try again", "error")
      console.log(err)
    }
  }

  return (
    <Container fluid>
      <NavbarAdmin />
      <Row>
        <Col className="p-1 m-2 text-white bg-primary">
          <h6 className="display-6">Item Master Data Details</h6>
        </Col>
      </Row>
      <Row className="justify-content-end mt-2">
        <Col></Col>
        <Col xs="6"></Col>
        <Col>
          <Link to="/AdminAddItem">
            <Button variant="success">
              <Plus className="fs-4"></Plus>Add Item
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="m-4">
        <TableComponent
          headerData={["Item ID", "Issue Status", "Item Description", "Item Make", "Item Category", "Valuation"]}
          tableData={responseFilter(items, ["itemId", "issueStatus", "itemDescription", "itemMake", "itemCategory", "itemValuation"])}
          tableActions={[
            { actionName: "Edit", actionCallback: (e) => editItems(e) },
            { actionName: "Delete", actionCallback: (val) => deleteItem(val) }
          ]} />
      </Row>
      {edit ? (
        <Row className="justify-content-md-center">
          <Card className="w-50">
            <Card.Title className="m-3 bg-light text-dark p-2">
              Edit Item
            </Card.Title>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="loanId"
              >
                <Form.Label column sm={2}>
                  Item Id
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder={itemId}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              {/* <Row>
                <Col sm={3}>
                  <label>Loan Id</label>
                </Col>
                <Col sm={5}>
                  <input 
                    type="text" 
                      name="itemId" 
                      value={itemId} 
                      onChange={(e) => setItemId(e.target.value)}>
                  </input>
                </Col>
              </Row> */}
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="category"
              >
                <Form.Label column sm={2}>
                  Issue Category
                </Form.Label>
                <Col sm={4}>
                  <Form.Select value={category} onChange={handleCategoryChange}>
                    <option value="furniture">Furniture</option>
                    <option value="crockery">Crockery</option>
                    <option value="stationery">Stationery</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              {/* <label>Item Category
              <select 
              value={category} 
              onChange={handleCategoryChange}>
                  <option       value="furniture">Furniture</option>
                  <option value="crockery">Crockery</option>
                  <option value="stationery">Stationery</option>
              </select>
            </label> */}

              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="desc"
              >
                <Form.Label column sm={2}>
                  Item Description
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="valuation"
              >
                <Form.Label column sm={2}>
                  Item Value
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="number"
                    value={valuation}
                    onChange={(e) => setValuation(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="status"
              >
                <Form.Label column sm={2}>
                  Issue Status
                </Form.Label>
                <Col sm={4}>
                  <Form.Select value={status} onChange={handleItemStatus}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="make"
              >
                <Form.Label column sm={2}>
                  Issue Make
                </Form.Label>
                <Col sm={4}>
                  <Form.Select value={make} onChange={handleItemMake}>
                    <option value="wood">Wood</option>
                    <option value="glass">Glass</option>
                    <option value="plastic">Plastic</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="success" onClick={(e) => {
                    setEdit(false);
                    handleSubmit(e);
                  }}>
                    Edit Data
                  </Button>
                  <Button
                    className="m-3"
                    variant="outline-danger"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Row>
      ) : null}
      {/* <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        { <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span>}
      </div> */}
    </Container>

  );
};


export default AdminItemMaster;