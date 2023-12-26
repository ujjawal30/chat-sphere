import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AxiosClient from "../../api/AxiosClient";
import { ToastContext } from "../../context/ToastProvider";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { toastify } = useContext(ToastContext);

  const fetchData = async () => {
    const registerUserResponse = await AxiosClient.post("/api/user/register", {
      name,
      email,
      password,
    })
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("registerUserResponse :>> ", registerUserResponse);
    if (registerUserResponse) {
      toastify({
        open: true,
        type: "success",
        message: "User registered successfully",
      });

      localStorage.setItem("user", JSON.stringify(registerUserResponse));
      navigate("/chats");
    } else {
      toastify({
        open: true,
        type: "error",
        message: "Something wnet wrong!!!",
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      toastify({
        open: true,
        type: "error",
        message: "Please fill all the fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toastify({
        open: true,
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    fetchData();
  };

  return (
    <Stack direction={"column"} p={2} gap={2}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          label="E-mail"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <OutlinedInput
          id="email"
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      <Button variant="contained" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Stack>
  );
};

export default SignUp;
