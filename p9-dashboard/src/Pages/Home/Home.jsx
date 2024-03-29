import React, { useEffect } from "react";
import useUserMainData from "../../hooks/mainData.js";

function Home({ id }) {
  const mainData = useUserMainData(id); // Assuming the hook is correctly fetching data

  // Use useEffect for logging if you want to see the data as soon as it's fetched
  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

  // If you want to conditionally render the data or check if it exists before rendering
  return (
    <div>
      {mainData ? <p>Data loaded, check console</p> : <p>Loading data...</p>}
    </div>
  );
}

export default Home;
