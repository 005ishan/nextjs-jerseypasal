import axios from "axios";
const Base_url ="http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: Base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
