import { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { X } from 'react-feather';
import GlobalContext from "../context/GlobalContext";

function AddEventModal({ show, handleClose, availableLocations, user, rowData }) {
    console.log("userInfo", user, rowData);
    const { addEvent } = useContext(GlobalContext);

    const defaultObj = {
        title: '',
        description: '',
        date: '',
        category: '',
        location_id: '',
        created_by: user.id
    };

    const [eventObj, setEventObj] = useState(rowData || defaultObj);
    const [errors, setErrors] = useState({});

    // Sync rowData with eventObj when editing
    useEffect(() => {
        if (rowData) {
            setEventObj(rowData);
        }
    }, [rowData]);

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
        if (!eventObj.location_id) newErrors.location_id = "Location is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReset = () => {
        setEventObj(rowData || defaultObj); // Reset to rowData if editing, or default
        setErrors({});
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            console.log("InAddEvent", eventObj);
            eventObj.created_by = user.id;
            const result = await addEvent(eventObj);
            console.log(result);
            handleClose();
            handleReset();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>{rowData ? "Edit Event" : "Add New Event"}</Modal.Title>
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
                            value={eventObj.title || ''}
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
                            value={eventObj.description || ''}
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
                            value={eventObj.date || ''}
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
                            value={eventObj.category || ''}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Select 
                            name="location_id" 
                            value={eventObj.location_id || ''} 
                            onChange={handleChange}
                            isInvalid={!!errors.location_id}
                        >
                            <option value="">Select Location</option>
                            {availableLocations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.location_id}</Form.Control.Feedback>
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
