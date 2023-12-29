import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Box, Container, Grid } from "@mui/material";
import { UserContext } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { ChatContext } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = useContext(UserContext);
  const { chat, setChat } = useContext(ChatContext);

  useEffect(() => {
    console.log("user :>> ", user);
  }, [user]);

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 2 }, height: "100vh" }}>
      <Box display={"flex"} flexDirection={"column"} gap={2} height={"100%"}>
        <Navbar />
        <Grid container spacing={2} flexGrow={1} overflow={"hidden"}>
          <Grid
            item
            md={4}
            xs={12}
            display={{ xs: chat ? "none" : "block", md: "block" }}
          >
            <ChatList />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            display={{ xs: chat ? "block" : "none", md: "block" }}
            sx={{ position: "relative", height: "100%" }}
          >
            <ChatWindow />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatPage;
