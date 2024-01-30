import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/api/",
});

// https://tweet-app-hrsf.onrender.com
