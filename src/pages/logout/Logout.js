import React, { useContext } from "react";
import {
  Button,
  Card,
  Col,
  Container,

  Row
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Logout = () => {
  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = async () => {
    localStorage.clear();
    setUser(null);
    setTimeout(() => {
      history.push("/");
    }, 500)

  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} sm={10}>
          <Card className="my-4 p-4">
            <h4 className="text-center">Logout</h4>
            <p className="text-center">Are your sure?</p>
            <p className="text-center">Do you really want to exit?</p>
            <Button onClick={handleLogout}>Logout</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
