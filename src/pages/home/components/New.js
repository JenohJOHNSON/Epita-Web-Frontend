import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../core/axios";
import classes from "./New.module.css";

const New = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    try {
      const response = await axios.get("movie");
      setMovies(response.data.slice(0, 4));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <section id="new" className="py-4">
      <h2 className="text-primary text-center my-4">New Movies</h2>
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

export default New;
