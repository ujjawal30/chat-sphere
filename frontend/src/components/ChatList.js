import { Box, Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../context/ChatProvider";

const ChatData = [
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
  {
    _id: "658c0a6d6a3b09dc9d1daccd",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ollie Mccullough",
    email: "olliemccullough@chorizon.com",
    about: "Nulla laboris enim eiusmod dolore ea occaecat quis aliquip.",
    lastTime: "06:22",
  },
  {
    _id: "658c0a6d603e4cf7c70f7fb4",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Cortez Miles",
    email: "cortezmiles@chorizon.com",
    about: "Qui est ex ea sit non esse quis minim amet esse pariatur culpa.",
    lastTime: "04:57",
  },
  {
    _id: "658c0a6dc82c09c2621ff113",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Laurel Gamble",
    email: "laurelgamble@chorizon.com",
    about:
      "Excepteur mollit ea non cupidatat Lorem ut exercitation irure velit magna.",
    lastTime: "08:46",
  },
  {
    _id: "658c0a6d001547880e45da47",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Ross Barton",
    email: "rossbarton@chorizon.com",
    about:
      "Id dolore nostrud sit cupidatat culpa et labore ea duis excepteur excepteur velit labore.",
    lastTime: "12:30",
  },
  {
    _id: "658c0a6d9d21450e84ce63b8",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "Christensen Horton",
    email: "christensenhorton@chorizon.com",
    about:
      "Laboris ad pariatur consequat Lorem tempor laborum ipsum amet consequat aliqua proident.",
    lastTime: "10:54",
  },
];

const ChatList = () => {
  const { allChats, setAllChats } = useContext(ChatContext);

  useEffect(() => {
    setAllChats(ChatData);
  }, []);

  return (
    <Box overflow={"hidden"} borderRadius={5}>
      {/* <Box bgcolor={"white"} borderRadius={5} p={{ xs: 1, sm: 2 }} mb={1}>
        ds
      </Box> */}
      <Box
        bgcolor={"white"}
        borderRadius={5}
        p={{ xs: 1, sm: 2 }}
        height="calc(100vh - 104px)"
        sx={{ overflowY: "scroll" }}
      >
        {allChats?.map((data, index) => (
          <Box key={data._id}>
            <ChatCard data={data} />
            {index + 1 !== allChats.length && <Divider variant="middle" />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatList;
