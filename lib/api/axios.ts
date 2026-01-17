import axios from "axios";
const Base_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: Base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
