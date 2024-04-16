import React, { useEffect } from "react";
import useUserMainData from "../../hooks/mainData.js";
import UserActivityChart from "../../Components/DailyActivity/index.jsx";
import UserAverageSessionsChart from "../../Components/averageSession/index.jsx";
import UserPerformanceChart from "../../Components/Intensity/index.jsx";
import UserScore from "../../Components/Score/index.jsx";

function Home({ id }) {
  // const mainData = useUserMainData(id);

  //useeffect if you want to log when data is loaded, don't forget the mainData in square brackets
  // useEffect(() => {
  //   console.log(mainData);
  // }, [mainData]);

  return (
    <>
      <div>
        {" "}
        <UserActivityChart userId={id} />
        <UserAverageSessionsChart userId={id} />
        <UserPerformanceChart userId={id} />
        <UserScore userId={id} />
      </div>
    </>
  );
}

export default Home;
