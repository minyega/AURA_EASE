import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { getClient, updateClient } from '../../../utils/parlour';
import { NotificationError, NotificationSuccess } from '../../utils/Notifications';

const UpdateClient = ({clientId}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        // fetch client details
        const fetchClient = async () => {
            try {
                const client = await getClient(clientId);
                setName(client.name);
                setEmail(client.email);
                setPhone(client.phone);
                setAddress(client.address);
            }   
            catch (error) {
                console.log({error});           
            }
        }
        fetchClient();
    }, [clientId]);

    const updateChange = async () => {
        try {
            // update client
            await updateClient({id: clientId, name, email, phone, address});
            toast(<NotificationSuccess text="Client updated successfully." />);
            window.location.reload();
        } catch (error) {
            console.log({error});
            toast(<NotificationError text="Failed to update a Client." />);
        }
    }

    const isFormFilled = () =>  name && email && phone && address;

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
          <Modal.Title>Update Client</Modal.Title>
        </Modal.Header>
            <Form>
                <Modal.Body>
                    <FloatingLabel
                            controlId='inputName'
                            label="Client name"
                            className='mb-3'
                    >
                        <Form.Control
                        type='text'
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder='Enter Client name'
                        />
                    </FloatingLabel>
                    <FloatingLabel
                            controlId='inputEmail'
                            label="Email"
                            className='mb-3'
                    >
                        <Form.Control
                        type='email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='Enter Email'
                        />
                    </FloatingLabel>
                    <FloatingLabel
                            controlId='inputPhone'
                            label="Phone"
                            className='mb-3'
                    >
                        <Form.Control
                        type='text'
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        placeholder='Enter Phone'
                        />
                    </FloatingLabel>
                    <FloatingLabel
                            controlId='inputAddress'
                            label="Address"
                            className='mb-3'
                    >
                        <Form.Control
                        type='text'
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        placeholder='Enter Address'
                        />
                    </FloatingLabel>
                    
                </Modal.Body>
            </Form>
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
      </Modal>
    </>
   
  )
}

export default UpdateClient