import React, { useContext, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { UserContext } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import { ChatContext } from "../context/ChatProvider";
import GroupModal from "../components/modals/GroupModal";
import ProfileModal from "../components/modals/ProfileModal";
import { getSender } from "../helpers/ChatHelpers";
import MyChats from "../sections/MyChats";
import ChatWindow from "../sections/ChatWindow";

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
  const [fetchAgain, setFetchAgain] = useState(false);
  const [groupModalOptions, setGroupModalOptions] = useState(
    defaultGroupModalOptions
  );
  const [profileModalOptions, setProfileModalOptions] = useState(
    defaultProfileModalOptions
  );

  const { user } = useContext(UserContext);
  const { chat } = useContext(ChatContext);

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

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 1 }, height: "100vh" }}>
      <Box display={"flex"} flexDirection={"column"} gap={1} height={"100%"}>
        <Navbar
          onGroupModalOpen={openGroupModal}
          onProfileModalOpen={openProfileModal}
        />
        <Grid container spacing={1} flexGrow={1} overflow={"hidden"}>
          <Grid
            item
            md={4}
            xs={12}
            display={{ xs: chat ? "none" : "block", md: "block" }}
            sx={{ position: "relative", height: "100%" }}
          >
            <MyChats fetchAgain={fetchAgain} />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            display={{ xs: chat ? "block" : "none", md: "block" }}
            sx={{ position: "relative", height: "100%" }}
          >
            <ChatWindow
              openGroupModal={openGroupModal}
              openProfileModal={openProfileModal}
            />
          </Grid>
        </Grid>
      </Box>
      <GroupModal
        groupData={groupModalOptions.data}
        open={groupModalOptions.open}
        createMode={groupModalOptions.createMode}
        onClose={closeGroupModal}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
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
