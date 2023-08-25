import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const styles = {
    padding: "10px",
    border: "1px solid",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "22px",
    margin: "5px",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <Link to="/frontend" style={styles}>
          FrontEnd Task
        </Link>
        <Link to="/backend" style={styles}>
          Backend Task
        </Link>
      </div>
    </div>
  );
};

export default Home;
