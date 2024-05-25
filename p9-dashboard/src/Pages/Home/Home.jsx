import React from "react";
import UserActivityChart from "../../Components/DailyActivity/index.jsx";
import UserAverageSessionsChart from "../../Components/averageSession/index.jsx";
import UserPerformanceChart from "../../Components/Intensity/index.jsx";
import UserScore from "../../Components/Score/index.jsx";
import Nutrients from "../../Components/Nutrients/index.jsx";
import Welcome from "../../Components/welcome/Welcome.jsx";

const isMockData = false;

function Home({ id }) {
  return (
    <>
      <div className="home-container">
        <div className="welcome-message">
          <Welcome userId={id} isMockData={isMockData} />
        </div>{" "}
        <div className="main-charts">
          {" "}
          <div className="charts-container" style={{ height: "100%" }}>
            {/* <UserActivityChart userId={id} isMockData={isMockData} /> */}
            <div className="small-charts-container">
              <UserAverageSessionsChart userId={id} isMockData={isMockData} />
              <UserPerformanceChart userId={id} isMockData={isMockData} />
              {/* <UserScore userId={id} isMockData={isMockData} /> */}
            </div>
          </div>
          {/* <Nutrients userId={id} isMockData={isMockData} /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
