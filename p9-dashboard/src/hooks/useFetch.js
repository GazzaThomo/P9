import {
  useUserAverageSessions,
  useUserActivity,
  useUserMainData,
  useUserPerformance,
} from "./service.js";

export function useFetch(dataCallType, id, isMockData) {
  switch (dataCallType) {
    case "averageSession":
      return useUserAverageSessions(id, isMockData);
    case "mainData":
      return useUserMainData(id, isMockData);
    case "activity":
      return useUserActivity(id, isMockData);
    case "performance":
      return useUserPerformance(id, isMockData);
    default:
      return null;
  }
}
