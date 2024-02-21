import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";


const AddAppointment = ({save}) => {

  const [clientId, setClientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  

  const isFormFilled = () => clientId && serviceId && appointmentDate && time && status;

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
          <Modal.Title>New Appointment</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputClientID"
              label="Client ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
                placeholder="Enter client id"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputServiceID"
              label="Service ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Service ID"
                onChange={(e) => {
                  setServiceId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDate"
              label="Appointment Date(DD/MM/YYYY)"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Appointment Date"
                onChange={(e) => {
                  setAppointmentDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputTime"
              label="Time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Time"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputStatus"
              label="Status(Pending or Completed)"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Status(Pending or Completed)"
                onChange={(e) => {
                  setStatus(e.target.value);
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
                save({
                  client_id: clientId,
                  service_id: serviceId,
                  date: appointmentDate,
                  time,
                  status,
                });
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

AddAppointment.propTypes = {
  save: PropTypes.func.isRequired,
}

export default AddAppointment