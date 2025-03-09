import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import GlobalContext from "../../context/GlobalContext";
import '../../App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [key, setKey] = useState('login');
  const { login, signup } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === 'signup') {
      signup(name, email, password);
    } else {
      login(email, password);
      navigate("/");
    }
  };

  return (
    <Container fluid className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
    <Row className="justify-content-center">
      <Col md={8} lg={12} className="d-flex justify-content-center">  
        <Card className="login-card shadow-lg" style={{ borderRadius: '20px', border: 'none', width: '100%', maxWidth: '700px' }}>
          <Card.Body className="p-5">
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-4"
              justify
            >
              <Tab eventKey="login" title="Login">
                <h2 className="text-center mb-4 text-primary">Welcome Back</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-3 rounded-3 shadow-sm"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-3 rounded-3 shadow-sm"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-3">
                    Login
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <h2 className="text-center mb-4 text-success">Create an Account</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="p-3 rounded-3 shadow-sm"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-3 rounded-3 shadow-sm"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-3 rounded-3 shadow-sm"
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100 py-3">
                    Sign Up
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  


  );
}

export default Login;