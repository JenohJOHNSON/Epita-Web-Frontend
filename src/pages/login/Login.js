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

const Login = () => {
  const [user, setUser] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const user = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      setTimeout(() => {
        history.push("/");
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
            <h4 className="text-center">Login</h4>
            <Form>
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
                    <Button onClick={handleSubmit}>Login</Button>
                  )}
              </div>
            </Form>

            <p className="text-center">
              Don't have an Account?{" "}
              <Link to="/register" replace>
                Register Here.
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
