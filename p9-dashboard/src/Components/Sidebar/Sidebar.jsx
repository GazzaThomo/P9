import React from "react";
import cycle from "../../assets/icon-cycle.png";
import meditate from "../../assets/icon-meditate.png";
import swim from "../../assets/icon-swim.png";
import weight from "../../assets/icon-weight.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar--icons">
        <img src={cycle} alt="cycling icon" className="icon" />
        <img src={meditate} alt="meditate icon" className="icon" />
        <img src={swim} alt="swim icon" className="icon" />
        <img src={weight} alt="weight icon" className="icon" />
      </div>
      <p className="sidebar--text">Copyright SportSee 2024</p>
    </div>
  );
}

export default Sidebar;
