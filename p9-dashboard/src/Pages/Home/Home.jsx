import React, { useEffect } from "react";
import useUserMainData from "../../hooks/mainData.js";
import UserActivityChart from "../../Components/DailyActivity/index.jsx";
import UserAverageSessionsChart from "../../Components/averageSession/index.jsx";
import UserPerformanceChart from "../../Components/Intensity/index.jsx";

function Home({ id }) {
  // const mainData = useUserMainData(id);

  //useeffect if you want to log when data is loaded, don't forget the mainData in square brackets
  // useEffect(() => {
  //   console.log(mainData);
  // }, [mainData]);

  return (
    <>
      <UserActivityChart userId={id} />
      <UserAverageSessionsChart userId={12} />
      <UserPerformanceChart userId={12} />
    </>
  );
}

export default Home;
