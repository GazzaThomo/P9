import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import { USER_MAIN_DATA } from "../mockApi/mockData.js"; // Import mock data

function useUserMainData(userId, isMockData) {
  const [userMainData, setUserMainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          // Return mock data if isMockData is true
          const mockUserData = USER_MAIN_DATA.find(
            (user) => user.id === userId
          );
          setUserMainData(mockUserData);
        } else {
          // Make API call if isMockData is false
          const response = await apiClient.get(`/user/${userId}`);
          setUserMainData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user main data:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, isMockData]);

  return userMainData;
}

export default useUserMainData;
