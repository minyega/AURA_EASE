import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddService = ({save}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const isFormFilled = () => name && description && duration && price;
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus
        "></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Service</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Service name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of service"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDuration"
              label="Duration"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPrice"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                  save({ name, description, duration, price });
                  handleClose();           
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}

AddService.propTypes = {
  save: PropTypes.func.isRequired,
}

export default AddService