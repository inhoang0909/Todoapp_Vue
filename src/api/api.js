import axios from "axios";

const api = axios.create({
  baseURL: "https://68a29a35c5a31eb7bb1d44a1.mockapi.io/donate", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
