import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

export default AxiosClient;
