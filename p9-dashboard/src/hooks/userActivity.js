import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";

function useUserActivity(userId) {
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/activity`);
        setUserActivity(response.data);
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return userActivity;
}

export default useUserActivity;
