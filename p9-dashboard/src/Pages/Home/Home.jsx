import React, { useEffect } from "react";
import useUserMainData from "../../hooks/mainData.js";

function Home({ id }) {
  const mainData = useUserMainData(id);

  //useeffect if you want to log when data is loaded, don't forget the mainData in square brackets
  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

  return <div>Hello world</div>;
}

export default Home;
