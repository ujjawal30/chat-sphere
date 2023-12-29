import axios from "axios";

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log("userInfo from client :>> ", userInfo);

  return userInfo?.jwt;
};

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 8000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default AxiosClient;
