import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { X } from 'react-feather';

function AddEventModal({ show, handleClose, addEvent }) {

    const defaultObj = {
        title: '',
        description: '',
        date: '',
        category: '',
        location: ''
    };

    const [eventObj, setEventObj] = useState(defaultObj);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventObj((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!eventObj.title) newErrors.title = "Event title is required";
        if (!eventObj.description) newErrors.description = "Description is required";
        if (!eventObj.date) newErrors.date = "Date is required";
        if (!eventObj.category) newErrors.category = "Category is required";
        if (!eventObj.location) newErrors.location = "Location is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReset = () => {
        setEventObj(defaultObj);
        setErrors({});
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("InAddEvent", eventObj)
            // addEvent(eventObj);
            // handleClose();
            // handleReset();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Add New Event</Modal.Title>
                <Button variant="link" onClick={handleClose} className="ms-auto">
                    <X size={24} />
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event title"
                            name="title"
                            value={eventObj.title}
                            onChange={handleChange}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter event description"
                            name="description"
                            value={eventObj.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={eventObj.date}
                            onChange={handleChange}
                            isInvalid={!!errors.date}
                        />
                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event category"
                            name="category"
                            value={eventObj.category}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event location"
                            name="location"
                            value={eventObj.location}
                            onChange={handleChange}
                            isInvalid={!!errors.location}
                        />
                        <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEventModal;
