import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Posts from "./components/Posts";
import Home from "./components/Home";
import Chess from "./components/Chess";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/frontend" Component={Chess} />
        <Route path="/backend" Component={Posts} />
      </Routes>
    </Router>
  );
}

export default App;
