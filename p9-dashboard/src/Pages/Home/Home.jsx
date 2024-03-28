import React, { useEffect } from "react";
import apiClient from "../../utils/apiService";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/user/12"); // Replace '/data' with the appropriate endpoint
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <>Hello world</>;
}

export default Home;
