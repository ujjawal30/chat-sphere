import { Box, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { UserContext } from "../context/UserProvider";

const Messages = ({ messages, isTyping }) => {
  const { user } = useContext(UserContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="2px"
      p={1}
      component={ScrollableFeed}
    >
      {messages.map((msg, index) => (
        <Box
          alignSelf={msg?.sender?._id === user._id ? "end" : "start"}
          maxWidth="80%"
          width="fit-content"
          mt={messages[index - 1]?.sender?._id === msg?.sender?._id ? 0 : 1}
        >
          {!(
            msg?.sender?._id === user._id ||
            messages[index - 1]?.sender?._id === msg?.sender?._id
          ) && (
            <Typography variant="subtitle2" color={"GrayText"}>
              {msg.sender.name}
            </Typography>
          )}
          <Paper
            key={msg._id}
            elevation={0}
            sx={{
              p: 1,
              alignSelf: msg?.sender?._id === user._id ? "end" : "start",
              backgroundColor:
                msg?.sender?._id === user._id ? "#1976d2" : "#cccccc",
              color: msg?.sender?._id === user._id ? "white" : "auto",
              width: "fit-content",
              overflowWrap: "anywhere",
              borderRadius: 2,
            }}
          >
            {msg.content}
          </Paper>
        </Box>
      ))}
      {isTyping && (
        <Typography mt={1} color={"GrayText"}>
          Typing...
        </Typography>
      )}
      {/* <Box ref={messagesEndRef}>fgn</Box> */}
    </Box>
  );
};

export default Messages;
