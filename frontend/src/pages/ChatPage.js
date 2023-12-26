import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { UserContext } from "../context/UserProvider";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("user :>> ", user);
  }, [user]);

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 2 } }}>
      <Navbar />
    </Container>
  );
};

export default ChatPage;
