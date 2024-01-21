import { Box, CircularProgress, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import { ChatContext } from "../context/ChatProvider";
import AxiosClient from "../api/AxiosClient";

const MyChats = ({ fetchAgain }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { allChats, setAllChats } = useContext(ChatContext);
  const client = AxiosClient();

  const fetchAllChats = async () => {
    const chatsResponse = await client
      .get(`/api/chats`)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    console.log("chatsResponse :>> ", chatsResponse);
    setAllChats(chatsResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAllChats();
  }, [fetchAgain]);

  return (
    <Box overflow={"hidden"} borderRadius={3} height="100%">
      <Box bgcolor={"white"} p={1} height="100%" sx={{ overflowY: "auto" }}>
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
              {index + 1 !== allChats.length && <Divider variant="middle" />}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
