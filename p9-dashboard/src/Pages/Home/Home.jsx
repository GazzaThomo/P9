import React, { useState, useEffect } from "react";
import UserActivityChart from "../../Components/DailyActivity/index.jsx";
import UserAverageSessionsChart from "../../Components/averageSession/index.jsx";
import UserPerformanceChart from "../../Components/Intensity/index.jsx";
import UserScore from "../../Components/Score/index.jsx";
import Nutrients from "../../Components/Nutrients/index.jsx";
import Welcome from "../../Components/welcome/Welcome.jsx";
import { useFetch } from "../../hooks/useFetch";
import ErrorPage from "../../Components/ErrorPage/index.jsx";

//import.meta is special js module that containes metadata
//import.meta.env exposes the .env files
//vite automatically loads env varibales from .env, and makes them usable via import.meta.env
const isMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";
// const isMockData = false;

function Home({ userId }) {
  const [isValidId, setIsValidId] = useState(true);
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useFetch("mainData", userId, isMockData);

  //validate the user ID and handle errors
  useEffect(() => {
    if (userMainDataResponse === null) {
      setIsValidId(false);
    } else {
      setIsValidId(true);
    }
    setLoading(false);
  }, [userId, isMockData, userMainDataResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //render error page if no id is found
  if (!isValidId) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="home-container">
        <div className="welcome-message">
          <Welcome userId={userId} isMockData={isMockData} />
        </div>{" "}
        <div className="main-charts">
          {" "}
          <div className="charts-container">
            <UserActivityChart userId={userId} isMockData={isMockData} />
            <div className="small-charts-container">
              <UserAverageSessionsChart
                userId={userId}
                isMockData={isMockData}
              />
              <UserPerformanceChart userId={userId} isMockData={isMockData} />
              <UserScore userId={userId} isMockData={isMockData} />
            </div>
          </div>
          <Nutrients userId={userId} isMockData={isMockData} />
        </div>
      </div>
    </>
  );
}

export default Home;
