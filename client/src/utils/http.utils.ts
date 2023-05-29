import axios from "axios";

import { API_BASE_URL } from "../common/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 2000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export default axiosInstance;
