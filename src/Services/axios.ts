import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
