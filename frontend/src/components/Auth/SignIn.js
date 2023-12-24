import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AxiosClient from "../../api/AxiosClient";

const defaultAlertConfig = { open: false, type: "success", message: "" };

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(defaultAlertConfig);

  const navigate = useNavigate();

  const authnticateUser = async () => {
    const userResponse = await AxiosClient.post("/api/user/auth", {
      email,
      password,
    })
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("userResponse :>> ", userResponse);
    if (userResponse) {
      setAlert({
        open: true,
        type: "success",
        message: "User logged-in successfully",
      });

      localStorage.setItem("user", JSON.stringify(userResponse));
      // navigate("/chats");
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Something wnet wrong!!!",
      });
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: "error",
        message: "Please fill all the fields.",
      });
      return;
    }

    authnticateUser();
  };

  return (
    <Stack direction={"column"} p={2} gap={2}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <OutlinedInput
          id="email"
          type="text"
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

      <Button variant="contained" onClick={handleSignIn}>
        Sign In
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SignIn;
