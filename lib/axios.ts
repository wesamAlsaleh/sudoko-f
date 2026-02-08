import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// add interceptors to handle 401/405 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 405) {
      console.error(
        "Method Not Allowed: Check your Spring Boot Controller mapping.",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
