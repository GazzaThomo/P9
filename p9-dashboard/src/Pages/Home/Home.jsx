import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

function Home() {
  const { userId } = useParams(); //get the userId from URL parameters
  const numericUserId = Number(userId); //convert userId to number
  const [isValidId, setIsValidId] = useState(true);
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useFetch("mainData", numericUserId, isMockData);

  //validate the user ID and handle errors
  useEffect(() => {
    if (userMainDataResponse === null || userMainDataResponse === undefined) {
      setIsValidId(false);
    } else {
      setIsValidId(true);
    }
    setLoading(false);
  }, [numericUserId, isMockData, userMainDataResponse]);

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
          <Welcome userId={numericUserId} isMockData={isMockData} />
        </div>{" "}
        <div className="main-charts">
          {" "}
          <div className="charts-container">
            <UserActivityChart userId={numericUserId} isMockData={isMockData} />
            <div className="small-charts-container">
              <UserAverageSessionsChart
                userId={numericUserId}
                isMockData={isMockData}
              />
              <UserPerformanceChart
                userId={numericUserId}
                isMockData={isMockData}
              />
              <UserScore userId={numericUserId} isMockData={isMockData} />
            </div>
          </div>
          <Nutrients userId={numericUserId} isMockData={isMockData} />
        </div>
      </div>
    </>
  );
}

export default Home;
