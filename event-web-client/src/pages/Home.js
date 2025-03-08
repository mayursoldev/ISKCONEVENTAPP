import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import GlobalContext from "../context/GlobalContext";

function Home() {
  const { events, fetchEvents } = useContext(GlobalContext);
  console.log("events", events)
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  // Fetch events on component mount (if not already fetched)
  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events, fetchEvents]);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Upcoming Events</h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Col key={event.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>
                    <strong>Date:</strong> {event.date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {event.location}
                  </Card.Text>
                  <Button variant="primary" href={event.id}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Loading events...</p>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {events.length > eventsPerPage && (
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

export default Home;