import axios from "axios";

const request = axios.create({
  baseURL: 'http://localhost:3000', // Corrected baseURL
});

export default request;
