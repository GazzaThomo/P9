import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import { USER_PERFORMANCE } from "../mockApi/mockData.js";

function useUserPerformance(userId, isMockData) {
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = USER_PERFORMANCE.find(
            (user) => user.userId === userId
          );

          setUserPerformance(mockUserData);
        } else {
          const response = await apiClient.get(`/user/${userId}/performance`);
          setUserPerformance(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user performance:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, isMockData]);

  return userPerformance;
}

export default useUserPerformance;
