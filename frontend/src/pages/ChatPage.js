import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { UserContext } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import { ChatContext } from "../context/ChatProvider";
import ChatCard from "../components/ChatCard";
import { ArrowBack, Info, Send } from "@mui/icons-material";
import AxiosClient from "../api/AxiosClient";
import GroupModal from "../components/modals/GroupModal";
import ProfileModal from "../components/modals/ProfileModal";
import { getSender } from "../helpers/ChatHelpers";

const ChatData = [
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
];

const MSG = [
  {
    content: "Hi",
    sent: false,
  },
  {
    content: "How r u",
    sent: false,
  },
  {
    content: "I m fine",
    sent: true,
  },
  {
    content: "Gm",
    sent: false,
  },
  {
    content: "Have a nice day",
    sent: false,
  },
  {
    content: "GN",
    sent: true,
  },
  {
    content: "SDTC",
    sent: true,
  },
];

const defaultGroupModalOptions = {
  open: false,
  data: {},
  createMode: true,
};

const defaultProfileModalOptions = {
  open: false,
  data: {},
};

const ChatPage = () => {
  const [messages, setMesaages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groupModalOptions, setGroupModalOptions] = useState(
    defaultGroupModalOptions
  );
  const [profileModalOptions, setProfileModalOptions] = useState(
    defaultProfileModalOptions
  );

  const { user } = useContext(UserContext);
  const { chat, setChat, allChats, setAllChats } = useContext(ChatContext);

  const messagesEndRef = useRef(null);

  const fetchAllChats = async () => {
    const chatsResponse = await AxiosClient.get(`/api/chats`)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("chatsResponse :>> ", chatsResponse);
    setAllChats(chatsResponse);
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    setMesaages([...messages, { content: newMsg, sent: true }]);
    setNewMsg("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };

  const openGroupModal = (createMode = true) =>
    setGroupModalOptions({
      open: true,
      data: createMode ? {} : chat,
      createMode,
    });

  const closeGroupModal = () =>
    setGroupModalOptions({ ...groupModalOptions, open: false });

  const openProfileModal = (self = true) =>
    setProfileModalOptions({
      open: true,
      data: self ? user : getSender(chat?.users, user),
    });

  const closeProfileModal = () =>
    setProfileModalOptions({ ...profileModalOptions, open: false });

  useEffect(() => {
    setIsLoading(true);
    fetchAllChats();
    setMesaages(MSG);
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log("new message send", messages);
  }, [messages]);

  useEffect(() => {
    console.log("selected", chat);
  }, [chat]);

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 2 }, height: "100vh" }}>
      <Box display={"flex"} flexDirection={"column"} gap={2} height={"100%"}>
        <Navbar
          onGroupModalOpen={openGroupModal}
          onProfileModalOpen={openProfileModal}
        />
        <Grid container spacing={2} flexGrow={1} overflow={"hidden"}>
          <Grid
            item
            md={4}
            xs={12}
            display={{ xs: chat ? "none" : "block", md: "block" }}
            sx={{ position: "relative", height: "100%" }}
          >
            <Box overflow={"hidden"} borderRadius={5} height="100%">
              <Box
                bgcolor={"white"}
                borderRadius={5}
                p={{ xs: 1, sm: 2 }}
                height="100%"
                sx={{ overflowY: "auto" }}
              >
                {isLoading ? (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  allChats?.map((data, index) => (
                    <Box key={data._id}>
                      <ChatCard data={data} />
                      {index + 1 !== allChats.length && (
                        <Divider variant="middle" />
                      )}
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            display={{ xs: chat ? "block" : "none", md: "block" }}
            sx={{ position: "relative", height: "100%" }}
          >
            <Box
              bgcolor={"white"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              borderRadius={5}
              p={2}
              position="relative"
              gap={1}
              height="100%"
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1}
              >
                <IconButton
                  disableTouchRipple
                  sx={{ p: 0, display: { md: "none" } }}
                  onClick={() => setChat(null)}
                >
                  <ArrowBack />
                </IconButton>
                <Avatar src={chat?.pic} sx={{ width: 48, height: 48 }} />
                <Stack flexGrow={1}>
                  <Typography variant="caption">
                    {chat?.chatName || "Test"}
                  </Typography>
                </Stack>
                <IconButton
                  onClick={
                    chat?.isGroupChat
                      ? () => openGroupModal(false)
                      : () => openProfileModal(false)
                  }
                >
                  <Info />
                </IconButton>
              </Box>
              <Box
                flexGrow={1}
                borderRadius={2}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
                overflow="hidden"
                py={1}
                sx={(theme) => ({
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                })}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="2px"
                  sx={{ overflowY: "auto" }}
                  px={1}
                >
                  {messages.map((msg) => (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1,
                        alignSelf: msg.sent ? "end" : "start",
                        backgroundColor: msg.sent ? "#1976d2" : "#cccccc",
                        color: msg.sent ? "white" : "auto",
                        maxWidth: "80%",
                        width: "fit-content",
                        overflowWrap: "anywhere",
                        borderRadius: 2,
                      }}
                    >
                      {msg.content}
                    </Paper>
                  ))}
                  <Box ref={messagesEndRef}>gy</Box>
                </Box>
              </Box>
              <Box display={"flex"} gap={1}>
                <TextField
                  id="message"
                  placeholder="Type your message..."
                  fullWidth
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  sx={{ "& .MuiInputBase-root": { borderRadius: 4 } }}
                />
                <Button
                  variant="contained"
                  edge="end"
                  sx={{ borderRadius: 4 }}
                  onClick={handleSendMessage}
                >
                  <Send />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <GroupModal
        groupData={groupModalOptions.data}
        open={groupModalOptions.open}
        createMode={groupModalOptions.createMode}
        onClose={closeGroupModal}
      />
      <ProfileModal
        userData={profileModalOptions.data}
        open={profileModalOptions.open}
        onClose={closeProfileModal}
      />
    </Container>
  );
};

export default ChatPage;
