import React, { useEffect } from "react";
import "./../../css/order.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Modal } from "react-bootstrap";
import { fireEvent } from "@testing-library/react";
import { ThemeContext } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";

const Order = ({ theme }) => {
  const initialvalue = {
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState();
  const [state, setState] = useState(initialvalue);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
    setSubmit(false);
  };
  // useEffect(() => {}, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (
      state.firstname == "" ||
      state.lastname == "" ||
      state.address == "" ||
      state.city == "" ||
      state.state == "" ||
      state.zip == ""
    ) {
      setError("Please enter your valid state");
    } else {
      setError("");
    }
    setState();
    if (error) return;
    console.log(state, "handlesubmit");
    console.log(error, "error");

    setState(initialvalue);
  };
  const handleOrder = () => {
    const data = localStorage.setItem("addressdata", JSON.stringify(state));
    console.log(data, "datalocalstorage");
    navigate("/orderconfirm");
  };

  return (
    <div>
      <button className="w-100" onClick={() => setIsModalOpen(true)}>
        DELIVERY ADDRESS
      </button>
      <ThemeContext.Provider value={theme}>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>ADDRESS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    // onChange={(e) => setState(e.target.value)}
                    required
                    name="firstname"
                    onChange={(e) => handleChange(e)}
                    value={state.firstname}
                    type="text"
                    placeholder="First name"
                  />
                  {error && !submit && <p className="error">{error}</p>}
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    name="lastname"
                    onChange={(e) => handleChange(e)}
                    value={state.lastname}
                    type="text"
                    placeholder="Last name"
                  />
                  {error && !submit && <p className="error">{error}</p>}
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="7"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Address</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      required
                      value={state.address}
                      onChange={(e) => handleChange(e)}
                      name="address"
                      as="textarea"
                      rows={3}
                      placeholder="address"
                    />
                  </InputGroup>
                  {!submit && error && <p className="error">{error}</p>}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => handleChange(e)}
                    value={state.city}
                    name="city"
                    type="text"
                    placeholder="City"
                  />
                  {error && !submit && <p className="error">{error}</p>}
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => handleChange(e)}
                    value={state.state}
                    name="state"
                    type="text"
                    placeholder="State"
                  />
                  {error && !submit && <p className="error">{error}</p>}
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => handleChange(e)}
                    value={state.zip}
                    name="zip"
                    type="text"
                    placeholder="Zip"
                  />
                  {error && !submit && <p className="error">{error}</p>}
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
                {error && !submit && <p className="error">{error}</p>}
              </Form.Group>

              <Button type="submit" onClick={() => handleOrder()}>
                PlaceOrder
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </ThemeContext.Provider>
    </div>
  );
};

export default Order;
