import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Pagination, Button, Nav } from "react-bootstrap";
import { PlusCircle, PenTool, Trash, UserPlus } from 'react-feather';
import GlobalContext from "../../context/GlobalContext";
import AddEventModal from "../EventRegistrations/AddEventModal";
import { FetchLocations } from "../../service/location-service";
import {   formatDate, showConfirmationDialog } from "../../common/commonMethods";
import { deleteEvent, registerForEvent } from "../../service/event-service";
import RegisteredEvents from "../EventRegistrations/MyRegistrations";
import AdminRegistrations from "../EventRegistrations/AdminRegistrations";
import Swal from "sweetalert2";

function Home() {
  const { events, fetchEvents, user } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ date: "", category: "", location_id: "" });
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [rowData, setRowdata] = useState();
  const [generalEvents, setGeneralEvents] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [action, setAction] = useState('Add');
  const [locationData, setLocationData] = useState([]); 
  const eventsPerPage = 6;
  const userRole = user.role;

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
     FetchLocation()

    }
  }, [events, fetchEvents]);
  const FetchLocation = async ()=>{
    let locationData = await FetchLocations(user);
    console.log(locationData)
    setLocationData(locationData)
  }

  const handleAddEvent = async () => {
    let locationData = await FetchLocations(user);
    setAction("Add")
    setAvailableLocations(locationData);
    setShowAddEventModal(true);
  };

  const handleCloseModal = () => setShowAddEventModal(false);

  const handleEdit = async (e) => {
    let locationData = await FetchLocations(user);
    setAvailableLocations(locationData);
    e.date = formatDate(e.date);
    setRowdata(e);
    setAction("Edit")
    setShowAddEventModal(true);
  };

  const handleDelete = (eventId, eventTitle) => {
    showConfirmationDialog(
      "Delete Event",
      `Do you really want to delete the event "${eventTitle}"?`,
      async () => {
        const result = await deleteEvent(eventId, eventTitle);
        Swal.fire({
          title: "Deleted!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          fetchEvents(); // Refresh event list
        });
      }
    );
  };
  

  const handleRegister = async (user, event) => {
    showConfirmationDialog(
      "Register for Event",
      `Are you sure you want to register for the event '${event.title}'?`,
      async () => {
        const result = await registerForEvent(user.id, event.id, event.title);
        Swal.fire({
          title: "Registered!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          fetchEvents(); // Refresh event list or update registration status
        });
      }
    );
  };
  
  const filteredEvents = events.filter((event) => {
    return (
      (!filters.date || event.date.includes(filters.date)) &&
      (!filters.category || event.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.location_id || 
        locationData?.find((loc) => loc.id === event.location_id)?.name.toLowerCase().includes(filters.location_id.toLowerCase()))
    );
  });
  

  
 

  const handleMyRegistrations= async () =>{
        setGeneralEvents(false)
      }
    
      const handleShowHome = () => {
        setGeneralEvents(true)
      }

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);

  return (
    <Container fluid className="bg-light min-vh-100">
  <Row>
    {/* Sidebar */}
    <Col md={2} className="bg-dark p-3 border-end shadow-sm">
      <Nav className="flex-column">
        <Nav.Link 
          active={activeTab === "dashboard"} 
          onClick={() => userRole == 'admin' ? setActiveTab("dashboard") : setGeneralEvents(true)}
          className="text-light mb-2 p-2 rounded hover-effect"
        >
          Dashboard
        </Nav.Link>
        <Nav.Link 
          active={activeTab === "registrations"} 
          onClick={() => userRole == 'admin' ? setActiveTab("registrations") : handleMyRegistrations()}
          className="text-light mb-2 p-2 rounded hover-effect"
        >
          Registrations
        </Nav.Link>
      </Nav>
    </Col>

    {/* Main Content */}
    <Col md={10} className="p-4 bg-light">
      {activeTab === "dashboard" ? (
        <>
          <h1 className="mb-4 text-center text-dark">
            {userRole === "admin" ? "Admin Dashboard" : (generalEvents ? "Events" : "My Registered Events")}
          </h1>
        
          {/* Filters Card */}
          <Card className="mb-4 p-3 shadow-sm bg-white border-0">
            <Row className="align-items-center">
              <Col md={3}>
                <Form.Floating>
                  <Form.Control
                    type="date"
                    placeholder="Filter by Date"
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="border-0 shadow-sm"
                  />
                  <Form.Label className="text-secondary">Date</Form.Label>
                </Form.Floating>
              </Col>
              <Col md={3}>
                <Form.Floating>
                  <Form.Control
                    type="text"
                    placeholder="Filter by Category"
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="border-0 shadow-sm"
                  />
                  <Form.Label className="text-secondary">Category</Form.Label>
                </Form.Floating>
              </Col>
              <Col md={3}>
                <Form.Floating>
                  <Form.Control
                    type="text"
                    placeholder="Filter by Location"
                    onChange={(e) => setFilters({ ...filters, location_id: e.target.value })}
                    className="border-0 shadow-sm"
                  />
                  <Form.Label className="text-secondary">Location</Form.Label>
                </Form.Floating>
              </Col>
              <Col md={3} className="text-end">
                {userRole === "admin" ? (
                  <Button variant="primary" className="d-flex align-items-center icon-hover shadow-sm" onClick={handleAddEvent}>
                    <PlusCircle size={20} className="me-2" /> Add New Event
                  </Button>
                ) : (
                  <>
                    {generalEvents ? (
                      <Button variant="outline-secondary" className="d-flex align-items-center icon-hover shadow-sm" onClick={handleMyRegistrations}>
                        My Registrations
                      </Button>
                    ) : (
                      <Button variant="outline-primary" className="d-flex align-items-center icon-hover shadow-sm" onClick={handleShowHome}>
                        Home
                      </Button>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </Card>

          {/* Events Grid */}
          {locationData && generalEvents ?  (
            <Card className="p-3 shadow-sm bg-white border-0">
              <Row xs={1} md={2} lg={3} className="g-4">
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <Col key={event.id}>
                      <Card className="shadow-sm border-0 hover-effect">
                        <Card.Body>
                          <Card.Title className="d-flex justify-content-between align-items-center text-dark">
                            {event.title}
                            {userRole === "admin" ? (
                              <span>
                                <PenTool size={20} className="text-warning me-2 cursor-pointer icon-hover" title="Edit Event" onClick={(e) => handleEdit(event)} />
                                <Trash size={20} className="text-danger cursor-pointer icon-hover" title="Delete Event" onClick={(e) => handleDelete(event.id, event.title)} />
                              </span>
                            ) : (
                                <UserPlus size={15} className="text-success me-2 cursor-pointer icon-hover"  onClick={(e) => handleRegister(user, event)} /> 
                              
                            )}
                          </Card.Title>
                          <Card.Text className="text-secondary">{event.description}</Card.Text>
                          <Card.Text className="text-secondary"><strong>Date:</strong> {formatDate(event.date)}</Card.Text>
                          <Card.Text className="text-secondary">
                            <strong>Location:</strong> 
                            {locationData?.find((obj) => obj.id === event.location_id)?.name || "Unknown Location"}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <h1 className="text-center text-secondary">No Data as searched</h1>
                )}
              </Row>
            </Card>
          ) : (
            <RegisteredEvents user={user} locationData={locationData} filteredEvents={filteredEvents} />
          )}

          {/* Pagination */}
          {filteredEvents.length > eventsPerPage && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} className="border-0 shadow-sm" />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                  className="border-0 shadow-sm"
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} className="border-0 shadow-sm" />
            </Pagination>
          )}

          {/* Add Event Modal */}
          <AddEventModal show={showAddEventModal} handleClose={handleCloseModal} availableLocations={availableLocations} user={user} rowData={rowData} action={action} />
        </>
      ) : (
        <AdminRegistrations locationData= {locationData}/>
      )}
    </Col>
  </Row>
</Container>
  );
}

export default Home;
