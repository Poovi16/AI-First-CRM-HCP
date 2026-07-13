import axios from "axios";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
