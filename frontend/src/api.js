import axios from "axios";

const API = axios.create({
  baseURL: "https://quickbite-order-management.onrender.com/api/menu/", // change after deployment
});

export default API;
