import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Pagination, Button } from "react-bootstrap";
import { PlusCircle, PenTool, Trash, UserPlus } from 'react-feather';
import GlobalContext from "../context/GlobalContext";
import AddEventModal from "./AddEventModal";

function Home() {
  const { events, fetchEvents, user } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ date: "", category: "", location: "" });
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const eventsPerPage = 5;
  const userRole = user.role;

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events, fetchEvents]);

  const handleAddEvent = () => setShowAddEventModal(true);
  const handleCloseModal = () => setShowAddEventModal(false);

  const filteredEvents = events.filter((event) => {
    return (
      (!filters.date || event.date.includes(filters.date)) &&
      (!filters.category || event.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">
        {userRole === "admin" ? "Event Management Dashboard" : "Upcoming Events"}
      </h1>

      <Card className="mb-4 p-3 shadow-sm">
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Floating>
              <Form.Control
                type="date"
                placeholder="Filter by Date"
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
              <Form.Label>Date</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={3}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder="Filter by Category"
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              />
              <Form.Label>Category</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={3}>
            <Form.Floating>
              <Form.Control
                type="text"
                placeholder="Filter by Location"
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <Form.Label>Location</Form.Label>
            </Form.Floating>
          </Col>
          <Col md={3} className="text-end">
            {userRole === "admin" ? (
              <Button variant="outline-success" className="d-flex align-items-center icon-hover" onClick={handleAddEvent}>
                <PlusCircle size={20} className="me-2" /> Add New Event
              </Button>
            ) : (
              <Button variant="outline-maroon" className="d-flex align-items-center icon-hover" style={{ color: '#800000', borderColor: '#800000' }}>
                My Registrations
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <Card className="p-3 shadow-sm">
        <Row xs={1} md={2} lg={3} className="g-4">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <Col key={event.id}>
                <Card className="shadow-sm border-0 hover-effect">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      {event.title}
                      {userRole === "admin" ? (
                        <span>
                          <PenTool size={20} className="text-warning me-2 cursor-pointer icon-hover" title="Edit Event" />
                          <Trash size={20} className="text-danger cursor-pointer icon-hover" title="Delete Event" />
                        </span>
                      ) : (
                        <Button variant="outline-primary" className="d-flex align-items-center icon-hover">
                          <UserPlus size={20} className="me-2" /> Register
                        </Button>
                      )}
                    </Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
                    <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No events found. Try adjusting your filters.</p>
            </Col>
          )}
        </Row>
      </Card>

      {filteredEvents.length > eventsPerPage && (
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

      <AddEventModal show={showAddEventModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default Home;
