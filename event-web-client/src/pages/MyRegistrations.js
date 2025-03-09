import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { fetchUserRegisteredEvents } from "../service/event-service";
import { formatDate } from "../common/commonMethods";

function RegisteredEvents({ user }) {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
                const result = await fetchUserRegisteredEvents(user.id);
                if (result.success) {
                    setRegisteredEvents(result.events);
                }
            }
        };
        fetchData();
    }, [user]);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = registeredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(registeredEvents.length / eventsPerPage);

    const nextPage = () => currentPage < totalPages && setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);

    return (
        <Container className="mt-4">
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <Col key={event.id}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Date:</strong> {formatDate(event.date)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Category:</strong> {event.category}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Location ID:</strong> {event.location_id}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No registered events found.</p>
                    </Col>
                )}
            </Row>

            {registeredEvents.length > eventsPerPage && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
                </Pagination>
            )}
        </Container>
    );
}

export default RegisteredEvents;
