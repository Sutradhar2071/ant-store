import axios from "axios";

// .env এ VITE_API_URL সেট করবেন। লোকালে ডিফল্ট ধরে নিচ্ছে http://localhost:5000
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("antstore_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
