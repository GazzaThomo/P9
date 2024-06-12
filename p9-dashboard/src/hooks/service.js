import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import * as mockData from "../mockApi/mockData.js";

export function useUserAverageSessions(userId, isMockData) {
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = mockData.USER_AVERAGE_SESSIONS.find(
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

export function useUserMainData(userId, isMockData) {
  const [userMainData, setUserMainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          // Return mock data if isMockData is true
          const mockUserData = mockData.USER_MAIN_DATA.find(
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

export function useUserActivity(userId, isMockData) {
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = mockData.USER_ACTIVITY.find(
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

export function useUserPerformance(userId, isMockData) {
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMockData) {
          const mockUserData = mockData.USER_PERFORMANCE.find(
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
