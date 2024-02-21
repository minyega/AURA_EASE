import React from 'react'
import { toast } from "react-toastify";
import { Card, Button, Col, Badge, Stack, Row } from "react-bootstrap";
import { deleteService } from '../../../utils/parlour';
import { NotificationError, NotificationSuccess } from '../../utils/Notifications';
import UpdateService from './UpdateService';

export const Service = ({service, getServices}) => {
    const {id, name,description, duration, price} = service;

    const discardService = async () => {
        try {
            deleteService(id).then(() => {
                getServices();
                toast(<NotificationSuccess text="Service deleted successfully." />);
            }).catch((error) => {
                toast(<NotificationError text="Failed to delete a Service." />);
            })
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <Card className="mb-3 mx-2">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                        <Card.Text>
                            <p>Duration: {duration.toString()} minutes</p>
                            <p>Price: {price.toString()} USD</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Service Id: {id}</p>
                        </Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="danger" onClick={() => {
                                discardService();
                            }}>Delete</Button>
                            <UpdateService serviceId={id} />
                        </Stack>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    )
}
