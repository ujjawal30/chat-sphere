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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { toastify } = useContext(ToastContext);
  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = () => {
    if (!email || !password) {
      toastify({
        open: true,
        type: "error",
        message: "Please fill all the fields.",
      });
      return;
    }

    login({ email, password });
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
    </Stack>
  );
};

export default SignIn;
