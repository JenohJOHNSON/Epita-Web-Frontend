import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import classes from "./Header.module.css";
const Header = () => {
  const [user, setUser] = useContext(AuthContext);
  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/" className={classes.Brand}>
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/movies">All Movies</Nav.Link>
            <Nav.Link href="/#recent">Recent Movies</Nav.Link>
            <Nav.Link href="/#new">New Movies</Nav.Link>
            <Nav.Link href="/#top">Top Rated</Nav.Link>
            <Nav.Link href="/#most">Most Watched</Nav.Link>
            {user ? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login / Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;
