import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";

import { getService, updateService } from '../../../utils/parlour';
import { NotificationError, NotificationSuccess } from '../../utils/Notifications';


const UpdateService = ({serviceId}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // fetch service details
        const fetchService = async () => {
            try {
                const service = await getService(serviceId);
                service.duration = parseInt(service.duration);
                service.price = parseInt(service.price);
                setName(service.name);
                setDescription(service.description);
                setDuration(service.duration);
                setPrice(service.price);
            }   
            catch (error) {
                console.log({error});           
            }
        }
        fetchService();
    }   , [serviceId]);

    const updateChange = async () => {
        try {
            // update service
            const updatedDuration = parseInt(duration);
            const updatedPrice = parseInt(price);
            await updateService({id: serviceId, name, description, duration: updatedDuration, price: updatedPrice});
            window.location.reload();
            toast(<NotificationSuccess text="Service updated successfully." />);
        } catch (error) {
            console.log({error});
            toast(<NotificationError text="Failed to update a Service." />);
        }
    }

    const isFormFilled = () =>  name && description && duration && price;

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
                    <Modal.Title>Update Service</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Service Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Duration"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Price"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
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

export default UpdateService