import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import NavbarAdmin from "../Components/NavbarAdmin";

export const AdminLoanDataEdit = () => {
  const lc = [
    {
      loanId: "L1001",
      loanType: "Furniture",
      durationInYears: 5,
    },
    {
      loanId: "L1002",
      loanType: "Stationery",
      durationInYears: 1,
    },
    {
      loanId: "L1003",
      loanType: "Crockery",
      durationInYears: 2,
    },
  ];
  const [loanCards, setLoanCards] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [loanType, setLoanType] = useState("furniture");
  const [duration, setDuration] = useState("");
  const [edit, setEdit] = useState(false);

  // const user = { emp_id: "E0002", designation: "Manager", department: "IT" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      loanId: loanId,
      loanType: loanType,
      durationInYears: duration,
    };

    try {
      const resp = await axios.put(`${baseURL}/UpdateLoan`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp);
      if (resp.status == 200) {
        swal(
          "Edit Successful",
          "The Loan Card details has been edited succesfully",
          "success"
        );
        const edittedLoanCards = loanCards.filter(
          (l) => l.loanId != data.loanId
        );
        setLoanCards([
          ...edittedLoanCards,
          {
            loanId: data.loanId,
            loanType: data.loanType,
            durationInYears: data.durationInYears,
          },
        ]);
      }
    } catch (err) {
      swal(
        "Edit not succesfull",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  const baseURL = "https://localhost:7223/api/admin";
  // const { token } = useAuth();
  const [token, setToken] = useState("init val");

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    setToken(sessionToken);
    getLoanCards(sessionToken);
  }, []);

  const getLoanCards = async (token) => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp);
      setLoanCards(resp.data);
    } catch (err) {
      swal(
        "Failed fetching Loan Cards",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  const editLoan = (val) => {
    const loanDetails = val;
    console.log(loanDetails);
    setLoanId(val.loanId);
    setLoanType(val.loanType);
    setDuration(val.durationInYears);
    setEdit(true);
  };

  const deleteLoan = async (val) => {
    const loanDetails = val;
    console.log(loanDetails);
    try {
      const resp = await axios.delete(
        `${baseURL}/DeleteLoanById?id=${val.loanId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resp);
      if (resp.status == 200) {
        swal(
          "Delete Successful",
          "The Loan Card details has been deleted succesfully",
          "success"
        );
        const edittedLoanCards = loanCards.filter(
          (loanCard) => loanCard.loanId !== val.loanId
        );
        setLoanCards(edittedLoanCards);
      }
    } catch (err) {
      swal(
        "Delete not succesfull",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <NavbarAdmin/>
      <Row>
        <Col className="p-1 m-2 text-white bg-primary">
          <h6 className="display-6">Loan Card Details</h6>
        </Col>
      </Row>
      <Row className="justify-content-end mt-2">
        <Col></Col>
        <Col xs="6"></Col>
        <Col>
          <Link to="/AdminLoanDataInsert">
            <Button variant="success">
              <Plus className="fs-4"></Plus>Add Loan Card
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="m-4">
        <TableComponent
          headerData={["Loan ID", "Loan Type", "Duration"]}
          tableData={responseFilter(loanCards, [
            "loanId",
            "loanType",
            "durationInYears",
          ])}
          tableActions={[
            { actionName: "Edit", actionCallback: (e) => editLoan(e) },
            { actionName: "Delete", actionCallback: (e) => deleteLoan(e) },
          ]}
        />
      </Row>
      {edit ? (
        <Row className="justify-content-md-center">
          <Card className="w-50">
            <Card.Title className="m-3 bg-light text-dark p-2">
              Edit Loan
            </Card.Title>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="loanId"
              >
                <Form.Label column sm={2}>
                  Loan Id
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder={loanId}
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
                    name="loanId"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                  ></input>
                </Col>
              </Row> */}
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="loanType"
              >
                <Form.Label column sm={2}>
                  Loan Type
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder={loanType}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              {/* <label>
                    Loan Type
                    <select
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value)}
                    >
                      <option value="furniture">Furniture</option>
                      <option value="crockery">Crockery</option>
                      <option value="stationery">Stationery</option>
                    </select>
                  </label> */}
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="duration"
              >
                <Form.Label column sm={2}>
                  Loan Duration
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="success" onClick={(e) => handleSubmit(e)}>
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

export default AdminLoanDataEdit;
