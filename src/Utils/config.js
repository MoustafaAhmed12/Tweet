import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tweet-app-hrsf.onrender.com/api/",
});
