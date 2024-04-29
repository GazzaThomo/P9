import React from "react";
import UserActivityChart from "../../Components/DailyActivity/index.jsx";
import UserAverageSessionsChart from "../../Components/averageSession/index.jsx";
import UserPerformanceChart from "../../Components/Intensity/index.jsx";
import UserScore from "../../Components/Score/index.jsx";
import Nutrients from "../../Components/Nutrients/index.jsx";

const isMockData = false;

function Home({ id }) {
  return (
    <>
      <div className="home-container">
        {" "}
        <div className="charts-container">
          <UserActivityChart userId={id} isMockData={isMockData} />
          <div className="small-charts-container">
            <UserAverageSessionsChart userId={id} />
            <UserPerformanceChart userId={id} />
            <UserScore userId={id} />
          </div>
        </div>
        <Nutrients userId={id} />
      </div>
    </>
  );
}

export default Home;
