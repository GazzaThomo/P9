import { useEffect, useState } from "react";
import apiClient from "../../mockApi/apiClient.js";

function useUserAverageSessions(userId) {
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/user/${userId}/average-sessions`
        );
        setUserAverageSessions(response.data);
      } catch (error) {
        console.error("Error fetching user average sessions:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return userAverageSessions;
}

export default useUserAverageSessions;
