import { useEffect, useState } from "react";
import apiClient from "../mockApi/mockApiService.js";
import * as mockData from "../mockApi/mockData.js";

//hook to fetch or mock user average session data
export function useUserAverageSessions(userId, isMockData) {
  //state to hold the user average sessions data
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  //effect to fetch data when userId or isMockData changes
  useEffect(() => {
    //function to fetch data
    const fetchData = async () => {
      try {
        if (isMockData) {
          //use mock data if isMockData is true
          const mockUserData = mockData.USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === userId
          );
          setUserAverageSessions(mockUserData);
        } else {
          //make api call if isMockData is false
          const response = await apiClient.get(
            `/user/${userId}/average-sessions`
          );
          setUserAverageSessions(response.data.data);
        }
      } catch (error) {
        //log error if any
        console.log("Error fetching user average sessions", error);
      }
    };

    //fetch data if userId is provided
    if (userId) fetchData();
  }, [userId, isMockData]);

  //return the user average sessions data
  return userAverageSessions;
}

//hook to fetch or mock user main data
export function useUserMainData(userId, isMockData) {
  //state to hold the user main data
  const [userMainData, setUserMainData] = useState(null);

  //effect to fetch data when userId or isMockData changes
  useEffect(() => {
    //function to fetch data
    const fetchData = async () => {
      try {
        if (isMockData) {
          //use mock data if isMockData is true
          const mockUserData = mockData.USER_MAIN_DATA.find(
            (user) => user.id === userId
          );
          setUserMainData(mockUserData);
        } else {
          //make api call if isMockData is false
          const response = await apiClient.get(`/user/${userId}`);
          setUserMainData(response.data.data);
        }
      } catch (error) {
        //log error if any
        console.error("Error fetching user main data:", error);
      }
    };

    //fetch data if userId is provided
    if (userId) fetchData();
  }, [userId, isMockData]);

  //return the user main data
  return userMainData;
}

//hook to fetch or mock user activity data
export function useUserActivity(userId, isMockData) {
  //state to hold the user activity data
  const [userActivity, setUserActivity] = useState(null);

  //effect to fetch data when userId or isMockData changes
  useEffect(() => {
    //function to fetch data
    const fetchData = async () => {
      try {
        if (isMockData) {
          //use mock data if isMockData is true
          const mockUserData = mockData.USER_ACTIVITY.find(
            (user) => user.userId === userId
          );
          setUserActivity(mockUserData);
        } else {
          //make api call if isMockData is false
          const response = await apiClient.get(`/user/${userId}/activity`);
          setUserActivity(response.data.data);
        }
      } catch (error) {
        //log error if any
        console.error("Error fetching user activity:", error);
      }
    };

    //fetch data if userId is provided
    if (userId) fetchData();
  }, [userId, isMockData]);

  //return the user activity data
  return userActivity;
}

//hook to fetch or mock user performance data
export function useUserPerformance(userId, isMockData) {
  //state to hold the user performance data
  const [userPerformance, setUserPerformance] = useState(null);

  //effect to fetch data when userId or isMockData changes
  useEffect(() => {
    //function to fetch data
    const fetchData = async () => {
      try {
        if (isMockData) {
          //use mock data if isMockData is true
          const mockUserData = mockData.USER_PERFORMANCE.find(
            (user) => user.userId === userId
          );

          setUserPerformance(mockUserData);
        } else {
          //make api call if isMockData is false
          const response = await apiClient.get(`/user/${userId}/performance`);
          setUserPerformance(response.data.data);
        }
      } catch (error) {
        //log error if any
        console.error("Error fetching user performance:", error);
      }
    };

    //fetch data if userId is provided
    if (userId) fetchData();
  }, [userId, isMockData]);

  //return the user performance data
  return userPerformance;
}
