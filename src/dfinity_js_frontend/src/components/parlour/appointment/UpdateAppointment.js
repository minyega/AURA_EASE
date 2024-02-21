import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { getClient, updateAppointment,  } from '../../../utils/parlour';
import { NotificationError, NotificationSuccess } from '../../utils/Notifications';

const UpdateAppointment = ({appointmentId}) => {
    const [clientId, setClientId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        // fetch appointment details
        const fetchAppointment = async () => {
            try {
                const appointment = await getClient(appointmentId);
                setClientId(appointment.clientId);
                setServiceId(appointment.serviceId);
                setDate(appointment.date);
                setTime(appointment.time);
                setStatus(appointment.status);
            }   
            catch (error) {
                console.log({error});           
            }
        }
        fetchAppointment();
    }  , [appointmentId]);

    const updateChange = async () => {
        try {
            // update appointment
            await updateAppointment({id: appointmentId, client_id: clientId, service_id: serviceId, date, time, status});
            toast(<NotificationSuccess text="Appointment updated successfully." />);
            window.location.reload();
        } catch (error) {
            console.log({error});
            toast(<NotificationError text="Failed to update a Appointment." />);
        }
    }

    const isFormFilled = () => clientId && serviceId && date && time && status;

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Appointment</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel controlId="inputClientId" label="Client Id" className="mb-3">
                            <Form.Control type="text" onChange={(e) => {setClientId(e.target.value);}} placeholder="Enter Client Id" />
                        </FloatingLabel>
                        <FloatingLabel controlId="inputServiceId" label="Service Id" className="mb-3">
                            <Form.Control type="text" onChange={(e) => {setServiceId(e.target.value);}} placeholder="Enter Service Id" />
                        </FloatingLabel>
                        <FloatingLabel controlId="inputDate" label="Date" className="mb-3">
                            <Form.Control type="text" onChange={(e) => {setDate(e.target.value);}} placeholder="Enter Date" />
                        </FloatingLabel>
                        <FloatingLabel controlId="inputTime" label="Time" className="mb-3">
                            <Form.Control type="text" onChange={(e) => {setTime(e.target.value);}} placeholder="Enter Time" />
                        </FloatingLabel>
                        <FloatingLabel controlId="inputStatus" label="Status" className="mb-3">
                            <Form.Control type="text" onChange={(e) => {setStatus(e.target.value);}} placeholder="Enter Status" />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={!isFormFilled()} onClick={() => {
                                updateChange();
                                handleClose();
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateAppointment