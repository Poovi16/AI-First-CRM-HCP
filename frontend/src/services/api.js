import axios from "axios";

// Read API URL from Vite environment
const API_URL = import.meta.env.VITE_API_URL;

console.log("API Base URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 120 seconds (helps with Render cold start)
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Log every request
api.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error),
);

// Optional: Log every response
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
