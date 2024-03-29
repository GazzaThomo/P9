import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function useUserPerformance(userId) {
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/performance`);
        setUserPerformance(response.data);
      } catch (error) {
        console.error("Error fetching user performance:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return userPerformance;
}

export default useUserPerformance;
