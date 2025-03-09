import { useEffect, useState } from "react";
import { Table, Container, Pagination } from "react-bootstrap";
import { fetchAllRegistrations } from "../../service/event-service";
import { formatDate } from "../../common/commonMethods";

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const registrationsPerPage = 10;

  useEffect(() => {
    const loadRegistrations = async () => {
      const result = await fetchAllRegistrations();
      if (result.success) {
        setRegistrations(result.data);
      }
    };
    loadRegistrations();
  }, []);

  const indexOfLastRegistration = currentPage * registrationsPerPage;
  const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);

  const totalPages = Math.ceil(registrations.length / registrationsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Event Registrations</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Event Title</th>
            <th>Event Description</th>
            <th>Location</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {currentRegistrations.length > 0 ? (
            currentRegistrations.map((registration, index) => (
              <tr key={index}>
                <td>{registration.userName}</td>
                <td>{registration.eventTitle}</td>
                <td>{registration.eventDescription}</td>
                <td>{registration.location}</td>
                <td>{formatDate(registration.registeredOn)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No registrations found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {registrations.length > registrationsPerPage && (
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

export default AdminRegistrations;
