import React, { useEffect } from "react";
import apiClient from "../../mockApi/mockApiService.js";

function Home({ id }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/user/" + id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return <>Hello world</>;
}

export default Home;
