import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import { USER_AVERAGE_SESSIONS } from "../mockApi/mockData.js";

function useUserAverageSessions(userId, isMockData) {
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === userId
          );
          setUserAverageSessions(mockUserData);
        } else {
          const response = await apiClient.get(
            `/user/${userId}/average-sessions`
          );
          setUserAverageSessions(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching user average sessions", error);
      }
    };

    if (userId) fetchData();
  }, [userId, isMockData]);

  return userAverageSessions;
}

export default useUserAverageSessions;
