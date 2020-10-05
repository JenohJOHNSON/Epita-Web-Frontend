import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "../../core/axios";

const Register = () => {
  const [user, setUser] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      //const user = response.data;
   //   setUser(user);
     // localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      setTimeout(() => {
        history.push("/login");
      }, 500)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} sm={10}>
          <Card className="my-4 p-4">
            <h4 className="text-center">Register</h4>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="text-center my-2">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <Button onClick={handleSubmit}>Register</Button>
                )}
              </div>
            </Form>

            <p className="text-center">
              Already have an Account?{" "}
              <Link to="/login" replace>
                Login Here.
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
