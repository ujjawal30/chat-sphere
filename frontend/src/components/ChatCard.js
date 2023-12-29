import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ChatContext } from "../context/ChatProvider";

const ChatCard = ({ data }) => {
  const { chat, setChat } = useContext(ChatContext);

  const handleChatClick = () => {
    data?._id === chat?._id ? setChat(null) : setChat(data);
  };

  return (
    <Paper
      className={data?._id === chat?._id ? "active" : ""}
      elevation={0}
      sx={(theme) => ({
        p: 1,
        position: "relative",
        // borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        "&.active": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
        },
        "&.active::before": {
          position: "absolute",
          content: "''",
          left: 0,
          top: 0,
          // borderRadius: 10,
          width: "2px",
          height: "100%",
          backgroundColor: theme.palette.primary.main,
        },
      })}
      onClick={handleChatClick}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Avatar src={data?.pic} sx={{ width: 48, height: 48 }} />
        <Stack flexGrow={1} width={"50%"}>
          <Typography
            variant="subtitle2"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontWeight={600}
          >
            {data?.name}
          </Typography>
          <Typography
            variant="caption"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
          >
            {data?.about}
          </Typography>
        </Stack>
        <Stack alignSelf={"start"} pt={1}>
          <Typography variant="caption">{data?.lastTime}</Typography>
        </Stack>
      </Box>
    </Paper>
    // <Card>
    //   <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
    //         R
    //       </Avatar>
    //     }
    //     action={
    //       <IconButton aria-label="settings">
    //         <MoreVert />
    //       </IconButton>
    //     }
    //     title="Shrimp and Chorizo Paella"
    //     subheader="September 14, 2016"
    //   />
    // </Card>
  );
};

export default ChatCard;
