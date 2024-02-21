import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Row, Container, Nav, InputGroup, FormControl, Button, Col } from "react-bootstrap";
import Loader from "../components/utils/Loader";
import AddClient from "../components/parlour/clients/AddClient";
import AddService from "../components/parlour/services/AddService";
import AddAppointment from "../components/parlour/appointment/AddAppointment";
import { createAppointment, createClient, createService,
   getClients as getClientList, getServices as getServicesList, getAppointments as getAppointmentsList,
   getClientAppointments,
   getAppointmentsByStatus,
   getServiceRevenue,
   getMostPopularService,
   getMostPopularClient} from "../utils/parlour";
import { NotificationError, NotificationSuccess } from "../components/utils/Notifications";
import Client from "../components/parlour/clients/Client";
import { Service } from "../components/parlour/services/Service";
import Appointment from "../components/parlour/appointment/Appointment";


const Parlour = () => {

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [searchClient, setSearchClient] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [serviceRevenue, setServiceRevenue] = useState(null);
  const [searchAppointments, setSearchAppointments] = useState([]);
  const [clientAppointments, setClientAppointments] = useState([]);
  const [popularService, setPopularService] = useState({});
  const [popularClient, setPopularClient] = useState({});

  const getClients = useCallback( async () => {
    try {
      setLoading(true);
      setClients(await getClientList());
      console.log(clients)
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  })

  const addClient = async (data) => {
      try {
        setLoading(true);
        createClient(data).then(()=>{
          getClients();
      })
        toast(<NotificationSuccess text="Client created successfully." />);
      } catch (error) {
        console.log({error});
        toast(<NotificationError text="Failed to create a Client." />);
      } finally {
        setLoading(false)
      }
  }

  const getServices = useCallback( async () => {
    try {
      setLoading(true);
      setServices(await getServicesList());
      console.log(services)
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  })  

  const addService = async (data) => {
    try {
      setLoading(true);
      data.duration = parseInt(data.duration);
      data.price = parseInt(data.price);
      createService(data).then(()=>{
        getServices();
    })
      toast(<NotificationSuccess text="Service created successfully." />);
    } catch (error) {
      console.log({error});
      toast(<NotificationError text="Failed to create a Service." />);
    } finally {
      setLoading(false)
    }
  }

  const getAppointments = useCallback( async () => {
    try {
      setLoading(true);
      setAppointments(await getAppointmentsList());
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  })

  const addAppointment = async (data) => {
    try {
      setLoading(true);
      createAppointment(data).then(()=>{
        getAppointments();
    })
      toast(<NotificationSuccess text="Appointment created successfully." />);
    } catch (error) {
      console.log({error});
      toast(<NotificationError text="Failed to create a Appointment." />);
    } finally {
      setLoading(false)
    }
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if(tab === "clients"){
      getClients();
    } else if(tab === "services"){
      getServices();
    } else if(tab === "appointments"){
      getAppointments();
    }
  }

  const handleSearch = async () => {
    // search for client appointments
    try {
      setLoading(true);
      setClientAppointments(await getClientAppointments(searchClient));
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }

  }

  const handleSearchStatus = async (status) => {
    // search for appointments by status
    setSearchStatus(status);
    try {
      setLoading(true);
      setSearchAppointments(await getAppointmentsByStatus(status));
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }

  const handleSearchRevenue = async () => {
    try {
      setLoading(true);
      setServiceRevenue(await getServiceRevenue(serviceId,date));
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }

  const getPopularService = async () => {
    try {
      setLoading(true);
      const service = await getMostPopularService();
      setPopularService(service);
      console.log(service)
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }

  const getPopularClient = async () => {
    try {
      setLoading(true);
      const client = await getMostPopularClient();
      setPopularClient(client);
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }



  // useEffect(() => {
  //   getClients();
  //   getAppointments();
  //   getServices();
  // }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mt-1 mb-4 border border-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center border-right-2">
              <h1 className="fs-4 fw-bold mb-0 px-2">Create Client</h1>
              <AddClient save={addClient} />
            </div>
            <div className="d-flex justify-content-between align-items-center border-right-2">
              <h1 className="fs-4 fw-bold mb-0 px-2">Create Service</h1>
              <AddService save={addService} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fs-4 fw-bold mb-0 px-2">Create Appointment</h1>
              <AddAppointment save={addAppointment}  />
            </div>
          </div>

          <Container fluid>
            <Nav variant="pills" defaultActiveKey="#clients" className="justify-content-center ">
              <Nav.Item  className="mx-3">
                <Nav.Link   
                  onClick={() => handleTabClick('clients')}
                  active={selectedTab === 'clients'}
                  style={{color: "black" , backgroundColor: "grey"}}
                >
                  Clients
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-3">
                <Nav.Link
                  onClick={() => handleTabClick('services')}
                  active={selectedTab === 'services'}
                  style={{color: "black", backgroundColor: "grey"}}
                >
                  Services
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-3">
                <Nav.Link
                  onClick={() => handleTabClick('appointments')}
                  active={selectedTab === 'appointments'}
                  style={{color: "black", backgroundColor: "grey"}}
                >
                  Appointments
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5 mt-4">

            {selectedTab === "clients" && clients.map((_client, index) => (
              <Client
                key={index}
                client={{
                  ..._client,
                }}
                getClients={getClients}
              />
            ))}
            {selectedTab === "services" && services.map((_service, index) => (
              <Service
                key={index}
                service={{
                    ..._service,
                }}
                getServices={getServices}
              />

            ))}
            {selectedTab === "appointments" && appointments.map((_appointment, index) => (
              <Appointment
                key={index}
                appointment={{
                  ..._appointment,
                }}
                getAppointments={getAppointments}
              />
            ))}
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-1 mb-4 border border-dark rounded p-3">
            <h1 className="fs-4 fw-bold mb-0 px-2">Get Client Appointments</h1>
            <Container fluid>

              <Row className="justify-content-center mt-4">
                <Col xs={12} sm={6} md={4} lg={3}>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search..."
                      aria-label="Search"
                      aria-describedby="search-button"
                      onChange={(e) => setSearchClient(e.target.value)}
                      />
                    <Button variant="primary" id="search-button" onClick={handleSearch}>
                      Search
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Container>

        </div>

        <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5 mt-4">
          {clientAppointments.map((_appointment, index) => (
            <Appointment
              key={index}
              appointment={{
                ..._appointment,
              }}
              getAppointments={getAppointments}
            />
          ))}
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-1 mb-4 border border-dark rounded p-3">
            <h1 className="fs-4 fw-bold mb-0 px-2">Get Appointments by Status</h1>
              <Row className="justify-content-center mt-4">
                <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-end">
                  <Button variant="success" className="me-2"
                    onClick={() => handleSearchStatus("completed")}
                  >
                    Completed
                  </Button>
                  <Button variant="warning"
                    onClick={() => handleSearchStatus("pending")}
                  >
                    Pending
                  </Button>
                </Col>
              </Row>
        </div>

        <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5 mt-4">
          {searchAppointments.map((_appointment, index) => (
            <Appointment
              key={index}
              appointment={{
                ..._appointment,
              }}
              getAppointments={getAppointments}
            />
          ))}
        </Row>
        <div className="container mt-4">
          <h2>Service Revenue</h2>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Service ID"
              aria-label="Service ID"
              onChange={(e) => setServiceId(e.target.value)}
            />
            <FormControl
              type="text"
              placeholder="Date"
              aria-label="Date"
              onChange={(e) => setDate(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearchRevenue}>
              Search
            </Button>
          </InputGroup>
          {serviceRevenue !== null && (
            <div className="mt-3">
              <h4>Service Revenue: {serviceRevenue.toString()} USD</h4>
            </div>
          )}
        </div>

        <div className="container mt-4">
          <h2>Most Popular Service</h2>
          <Button variant="primary" onClick={getPopularService}>
            Get
          </Button>
          {popularService && (
            <div className="mt-3">
              <h4>Service ID: {popularService.id}</h4>
              <h4>Service Name: {popularService.name}</h4>
              <h4>Description: {popularService.description}</h4>
              <h4>Service Duration: {parseInt(popularService.duration).toString()} Minutes</h4>
              <h4>Service Price: {parseInt(popularService.price).toString()} USD</h4>
            </div>
          )}
        </div>

        <div className="container mt-4">
          <h2>Most Popular Client</h2>
          <Button variant="primary" onClick={getPopularClient}>
            Get
          </Button>
          {popularClient && (
            <div className="mt-3">
              <h4>Client ID: {popularClient.id}</h4>
              <h4>Client Name: {popularClient.name}</h4>
              <h4>Client Email: {popularClient.email}</h4>
              <h4>Client Phone: {popularClient.phone}</h4>
              <h4>Client Address: {popularClient.address}</h4>
            </div>
          )}
        </div>
      </>
        
      ) : (
          <Loader />
      )}
    </>
  )
}

export default Parlour