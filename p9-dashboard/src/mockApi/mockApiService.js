import axios from "axios";

//create an axios instance with base configuration
const apiClient = axios.create({
  //set the base URL for all API requests
  baseURL: "http://localhost:3000/",
});

export default apiClient;
