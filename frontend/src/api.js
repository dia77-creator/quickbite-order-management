import axios from "axios";

const API = axios.create({
  baseURL: "https://quickbite-order-management.onrender.com/api/",
});

export default API;
