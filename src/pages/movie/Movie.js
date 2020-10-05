import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "../../core/axios";
import classes from "./Movie.module.css";
const Movie = () => {
  const [user, setUser] = useContext(AuthContext);
  const [movie, setMovie] = useState();
  const [play, setPlay] = useState(false);
  const [rate, setRate] = useState(false);
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const handlePlay = () => {
    setPlay(true);
  };

  const handleStop = async () => {
    setPlay(false);
    if (!user) return;
    await axios.put(`movie/${id}`, {
      user: user.id,
    });
    setMovie({
      ...movie,
      count: ++movie.count,
    });
  };

  const openRate = () => {
    setRate(true);
  };

  const closeRate = async () => {
    setRate(false);
    if (!user) return;
    const response = await axios.post(`movie/${id}`, {
      rating,
      user: user.id,
    });
    setRating(0);
    setMovie({
      ...movie,
      rating: response.data.rating,
    });
  };

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`movie/${id}`);
      setMovie(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) return <Spinner />;

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={4}>
            <Card>
              <img
                className={classes.Image}
                src={movie.poster}
                alt={movie.name}
              />
            </Card>
          </Col>
          <Col md={8}>
            <h2 className="mt-4 ml-2">{movie.name}</h2>
            <p className="mt-2 ml-2">{movie.description}</p>
            <p className="mt-2 ml-2">Rating {movie.rating}</p>
            <p className="mt-2 ml-2">{movie.count} Views</p>
            {user ? (
              <div className="mt-2 ml-2">
                <Button variant="warning" className="mr-2" onClick={handlePlay}>
                  Watch Now
                </Button>
                <Button variant="primary" onClick={openRate}>
                  Rate Now
                </Button>
              </div>
            ) : (
              <div className="mt-2 ml-2">
                <Link to="/login">
                  <Button variant="warning" className="mr-2">
                    Login to Watch
                  </Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={play} onClose={handleStop}>
        <Modal.Body>
          <p>Movie is playing (MOCK)</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleStop}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={rate} onClose={closeRate}>
        <Modal.Body>
          <h3 className="text-center">Your Rating</h3>
          <div className="text-center my-2 py-2">
            <Button
              variant={rating === 1 ? "primary" : "outline-primary"}
              size="lg"
              className="mr-1"
              onClick={() => setRating(1)}
            >
              1
            </Button>
            <Button
              variant={rating === 2 ? "warning" : "outline-warning"}
              size="lg"
              className="mr-1"
              onClick={() => setRating(2)}
            >
              2
            </Button>
            <Button
              variant={rating === 3 ? "dark" : "outline-dark"}
              size="lg"
              className="mr-1"
              onClick={() => setRating(3)}
            >
              3
            </Button>
            <Button
              variant={rating === 4 ? "info" : "outline-info"}
              size="lg"
              className="mr-1"
              onClick={() => setRating(4)}
            >
              4
            </Button>
            <Button
              variant={rating === 5 ? "success" : "outline-success"}
              size="lg"
              className="mr-1"
              onClick={() => setRating(5)}
            >
              5
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <Button variant="primary" size="lg" onClick={closeRate}>
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Movie;
