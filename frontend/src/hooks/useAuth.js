import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { ToastContext } from "../context/ToastProvider";
import AxiosClient from "../api/AxiosClient";

export const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const { toastify } = useContext(ToastContext);
  const navigate = useNavigate();
  const client = AxiosClient();

  const login = async (data) => {
    const userResponse = await client
      .post("/api/user/auth", data)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("userResponse :>> ", userResponse);
    if (userResponse) {
      toastify({
        open: true,
        type: "success",
        message: "User logged-in successfully",
      });
      // toastify("Logged in");

      setUser(userResponse.user);
      localStorage.setItem("user", JSON.stringify(userResponse));
      navigate("/");
    } else {
      toastify({
        open: true,
        type: "error",
        message: "Something wnet wrong!!!",
      });
    }
  };

  const register = async (data) => {
    const registerUserResponse = await client
      .post("/api/user/register", data)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("registerUserResponse :>> ", registerUserResponse);
    if (registerUserResponse) {
      toastify({
        open: true,
        type: "success",
        message: "User registered successfully",
      });

      setUser(registerUserResponse.user);
      localStorage.setItem("user", JSON.stringify(registerUserResponse));
      navigate("/");
    } else {
      toastify({
        open: true,
        type: "error",
        message: "Something wnet wrong!!!",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return { login, register, logout };
};
