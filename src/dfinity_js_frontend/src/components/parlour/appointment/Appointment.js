import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card, Button, Col, Badge, Stack, Row } from "react-bootstrap";
import { completeAppointment, deleteAppointment } from "../../../utils/parlour";
import { NotificationError, NotificationSuccess } from "../../utils/Notifications";
import UpdateAppointment from "./UpdateAppointment";

const Appointment = ({appointment, getAppointments}) => {
    const {id, client_id, service_id, date, time, status} = appointment;

    const discardAppointment = async () => {
        try {
            deleteAppointment(id).then(() => {
                getAppointments();
                toast(<NotificationSuccess text="Appointment deleted successfully." />);
            }).catch((error) => {
                toast(<NotificationError text="Failed to delete a Appointment." />);
            })
        } catch (error) {
            console.log({error});
        }
    }

    const statusUpdate = () => {
        try {
            // update appointment status
            completeAppointment(id).then(() => {
                getAppointments();
                toast(<NotificationSuccess text="Appointment status updated successfully." />);
            }).catch((error) => {
                toast(<NotificationError text="Failed to update a Appointment status." />);
            });
        }
        catch (error) {
            console.log({error});
            toast(<NotificationError text="Failed to update a Appointment status." />);
        }
    }



    return (
        <Card className="mb-3 mx-2">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>Client Id: {client_id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Service Id: {service_id}</Card.Subtitle>
                        <Card.Text>
                            <p>Date: {date}</p>
                            <p>Appointment Time:{time}</p>
                            <p>Status: {status}</p>
                        </Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="success" onClick={() => {
                                statusUpdate();
                            }}>Complete</Button>
                            <Button variant="danger" onClick={() => {
                                discardAppointment();
                            }}>Delete</Button>
                            <UpdateAppointment appointmentId={id} />
                        </Stack>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Appointment