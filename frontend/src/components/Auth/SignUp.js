import React, { useContext, useState } from "react";
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
import { ToastContext } from "../../context/ToastProvider";
import { useAuth } from "../../hooks/useAuth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { toastify } = useContext(ToastContext);
  const { register } = useAuth();

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

    register({ email, name, password });
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
