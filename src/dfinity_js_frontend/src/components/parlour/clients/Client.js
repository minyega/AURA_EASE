import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card, Button, Col, Badge, Stack, Row } from "react-bootstrap";
import { deleteClient } from "../../../utils/parlour";
import { NotificationError, NotificationSuccess } from "../../utils/Notifications";
import UpdateClient from "./UpdateClient";


const Client = ({client, getClients}) => {
    const {id, name, email, phone, address} = client;

    const discardClient = async () => {
        try {
            deleteClient(id).then(() => {
                getClients();
                toast(<NotificationSuccess text="Client deleted successfully." />);
            }).catch((error) => {
                toast(<NotificationError text="Failed to delete a Client." />);
            })
        } catch (error) {
            console.log({error});
            toast.error("Failed to delete client");
        }
    }

    return (
        <Card className="mb-3 mx-2">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                        <Card.Text>
                            <p>{phone}</p>
                            <p>{address}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Client Id: {id}</p>
                        </Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="danger" onClick={() => {
                                discardClient();
                            }}>Delete</Button>
                            <UpdateClient clientId={id} />
                        </Stack>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Client