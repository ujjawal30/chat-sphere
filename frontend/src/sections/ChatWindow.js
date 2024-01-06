import { ArrowBack, Info, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
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

const ChatWindow = ({ openGroupModal, openProfileModal }) => {
  const [messages, setMessages] = useState(MSG);
  const [newMsg, setNewMsg] = useState("");

  const messagesEndRef = useRef(null);

  const { chat, setChat } = useContext(ChatContext);

  const handleSendMessage = () => {
    setMessages([...messages, { content: newMsg, sent: true }]);
    setNewMsg("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };

  useEffect(() => {
    scrollToBottom();
    console.log("new message send", messages);
  }, [messages]);

  return (
    <Box bgcolor={"white"} height="100%" borderRadius={5}>
      {chat ? (
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
            <Avatar src={chat?.pic} sx={{ width: 48, height: 48 }} />
            <Stack flexGrow={1}>
              <Typography variant="h4">{chat?.chatName || "Test"}</Typography>
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
            sx={(theme) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
            })}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="2px"
              sx={{ overflowY: "auto" }}
              p={1}
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
              <Box ref={messagesEndRef}></Box>
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
