import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function useUserMainData(userId) {
  const [userMainData, setUserMainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/main-data`);
        setUserMainData(response.data);
      } catch (error) {
        console.error("Error fetching user main data:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return userMainData;
}

export default useUserMainData;
