import { ArrowBack, Info, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { ChatContext } from "../context/ChatProvider";
import AxiosClient from "../api/AxiosClient";
import { getSender } from "../helpers/ChatHelpers";
import { UserContext } from "../context/UserProvider";
import Messages from "../components/Messages";

let socket;

const ChatWindow = ({
  fetchAgain,
  setFetchAgain,
  openGroupModal,
  openProfileModal,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const { chat, setChat } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const client = AxiosClient();

  const fetchAllMessages = async () => {
    if (!chat) return;

    setIsLoading(true);
    const allMessages = await client
      .get(`api/messages/${chat._id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error.message));

    console.log("allMessages :>> ", allMessages);

    setMessages(allMessages);
    setIsLoading(false);

    socket.emit("join", chat._id);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (newMsg) {
      const messageResponse = await client
        .post("/api/messages", {
          chatId: chat._id,
          content: newMsg,
        })
        .then((response) => response.data)
        .catch((error) => console.log("error :>> ", error));

      setFetchAgain(!fetchAgain);
      setMessages([...messages, messageResponse]);
      setNewMsg("");

      socket.emit("message-sent", messageResponse);
    }
  };

  const isSent = () => {
    return getSender(chat?.users, user)._id === user._id;
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", user._id);
    socket.on("connected", () => setIsSocketConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message-recieved", (message) => {
      if (chat && chat._id === message.chat._id) {
        setMessages([...messages, message]);
        setFetchAgain(!fetchAgain);
      }
    });
  });

  useEffect(() => {
    fetchAllMessages();
    console.log("chat :>> ", chat);
  }, [chat]);

  return (
    <Box bgcolor={"white"} height="100%" borderRadius={3}>
      {isLoading ? (
        <Box
          height="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      ) : chat ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
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
            <Avatar
              src={chat?.isGroupChat ? "" : getSender(chat?.users, user).pic}
              sx={{ width: 48, height: 48 }}
            />
            <Stack flexGrow={1}>
              <Typography variant="h6" fontWeight={600}>
                {chat?.isGroupChat
                  ? chat?.chatName
                  : getSender(chat?.users, user).name}
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
            height="100%"
            overflow="hidden"
            sx={(theme) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
            })}
          >
            <Messages messages={messages} isTyping={isTyping} />
          </Box>
          <Box component="form" display={"flex"} gap={1}>
            <TextField
              required
              id="message"
              placeholder="Type your message..."
              fullWidth
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              sx={{ "& .MuiInputBase-root": { borderRadius: 4 } }}
            />
            <Button
              type="submit"
              variant="contained"
              edge="end"
              sx={{ borderRadius: 4 }}
              onClick={handleSendMessage}
            >
              <Send />
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          height="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography color={"GrayText"}>
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
