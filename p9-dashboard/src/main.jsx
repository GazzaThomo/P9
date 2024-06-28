import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import UserSelection from "./Pages/UserSelection/UserSelection.jsx";
import "./Scss/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className="main-body-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/user/:userId" element={<Home />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
