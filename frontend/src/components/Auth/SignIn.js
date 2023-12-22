import React, { useState } from "react";
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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = () => console.log({email, password})
  
  return (
    <Stack direction={"column"} p={2} gap={2}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <OutlinedInput
          id="email"
          type="text"
          label="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>

      <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
      <Button variant="contained" onClick={handleSignIn} color={'error'}>Get Guest Credentials</Button>
    </Stack>
  );
};

export default SignIn;
