import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import "./Scss/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <div className="main-body-container">
      <Sidebar />
      <Home />
    </div>
  </React.StrictMode>
);
