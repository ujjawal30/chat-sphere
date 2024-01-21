import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import axios from "axios";
import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const StyledTabs = styled((props) => <Tabs {...props} />)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  width: "40%",
  minHeight: 32,
  textTransform: "none",
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: 16,
  margin: "0 8px",
  borderRadius: 5,
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.dark,
  },
}));

const Homepage = () => {
  const [value, setValue] = useState(0);

  const { user } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api");
    console.log("data :>> ", data);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      maxWidth="xl" /*sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}*/
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        bgcolor={"white"}
        maxWidth={400}
        borderRadius={2}
        boxShadow={1}
        m={"40px auto 16px"}
        p={3}
      >
        <Typography variant="h4" fontFamily={"Poppins"}>
          ChatSphere
        </Typography>
      </Box>
      <Box
        bgcolor={"white"}
        maxWidth={400}
        borderRadius={2}
        boxShadow={1}
        m={"auto"}
        p={3}
      >
        <StyledTabs value={value} onChange={handleChange} centered>
          <StyledTab label="Sign In" />
          <StyledTab label="Sign Up" />
        </StyledTabs>
        {value === 0 && <SignIn />}
        {value === 1 && <SignUp />}
      </Box>
    </Container>
  );
};

export default Homepage;
