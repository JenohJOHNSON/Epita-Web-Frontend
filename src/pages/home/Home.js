import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MostWatched from "./components/MostWatched";
import New from "./components/New";
import Recent from "./components/Recent";
import TopRated from "./components/TopRated";

const Home = () => {
  const [user, setUser] = useContext(AuthContext);
  return (
    <React.Fragment>
      {user && <Recent />}
      <New />
      <TopRated />
      <MostWatched />
    </React.Fragment>
  );
};

export default Home;
