import { ArrowBack, Info, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatProvider";

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

const ChatWindow = () => {
  const { chat, setChat } = useContext(ChatContext);
  const [messages, setMesaages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const messagesEndRef = useRef(null);
  const messagesSendRef = useRef(null);

  const handleSendMessage = () => {
    setMesaages([...messages, { content: newMsg, sent: true }]);
    setNewMsg("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };

  useEffect(() => {
    setMesaages(MSG);
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log("new message send", messages);
  }, [messages]);

  return (
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
        <Avatar src={chat?.picture} sx={{ width: 48, height: 48 }} />
        <Stack flexGrow={1}>
          <Typography variant="caption">{chat?.name || "Test"}</Typography>
        </Stack>
        <Info color="disabled" />
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
      <Box display={"flex"}>
        <TextField
          id="message"
          placeholder="Type your message..."
          fullWidth
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <Button
          ref={messagesSendRef}
          variant="contained"
          edge="end"
          onClick={handleSendMessage}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
