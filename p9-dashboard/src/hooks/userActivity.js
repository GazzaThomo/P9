import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import { USER_ACTIVITY } from "../mockApi/mockData.js";

function useUserActivity(userId, isMockData) {
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = USER_ACTIVITY.find(
            (user) => user.userId === userId
          );
          setUserActivity(mockUserData);
        } else {
          const response = await apiClient.get(`/user/${userId}/activity`);
          setUserActivity(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, isMockData]);

  return userActivity;
}

export default useUserActivity;
