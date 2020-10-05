import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import axios from "../../../core/axios";
import classes from "./Recent.module.css";

const Recent = () => {
  const [user, setUser] = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`recent/${user.id}`);
      setMovies(response.data.reverse().slice(0, 8));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <section id="recent" className="py-4">
      <h2 className="text-primary text-center my-4">Recent Movies</h2>
      {movies.length === 0 && <p className="text-center">No Recent Movies</p>}
      <Container>
        <Row>
          {movies.map((e) => (
            <Col key={e.name} lg={3} md={4} sm={6} xs={12}>
              <Link to={"/" + e.id}>
                <Card className={classes.Movie}>
                  <img className={classes.Image} src={e.poster} alt={e.name} />
                  <h5 className={classes.Title}>{e.name}</h5>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Recent;
