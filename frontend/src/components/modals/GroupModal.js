import { Check, Clear, Edit, Search } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AxiosClient from "../../api/AxiosClient";
import { ToastContext } from "../../context/ToastProvider";
import { ChatContext } from "../../context/ChatProvider";

const buttonStyle = {
  boxShadow: 0,
  borderRadius: 2,
  "&:hover": {
    boxShadow: 0,
  },
  "&:last-child": {
    marginLeft: 1,
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "50%" },
  bgcolor: "background.paper",
  borderRadius: 5,
  maxHeight: 600,
  boxShadow: 24,
  p: 3,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const GroupModal = ({
  groupData,
  open,
  createMode,
  onClose,
  fetchAgain,
  setFetchAgain,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [group, setGroup] = useState({ chatName: "", users: [] });
  const [groupMemberIds, setGroupMemberIds] = useState([]);
  const [groupPic, setGroupPic] = useState("");

  const [searchUsers, setSearchUsers] = useState("");
  const [searchUsersResult, setSearchUsersResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toastify } = useContext(ToastContext);
  const { setAllChats, setChat } = useContext(ChatContext);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = file ? URL.createObjectURL(file) : "";
    setGroupPic(fileUrl);
  };

  const handleSaveGroup = async () => {
    console.log("group :>> ", group);
    console.log("groupMemberIds :>> ", groupMemberIds);
    if (!group.chatName) {
      toastify({
        open: true,
        type: "error",
        message: "Please provide the Group Name.",
      });
      return;
    }

    if (groupMemberIds.length < 2) {
      toastify({
        open: true,
        type: "error",
        message: "Please add atleast two users",
      });
      return;
    }

    const groupResponse = await AxiosClient.post(
      `/api/chats/group/${createMode ? "" : group._id}`,
      {
        chatName: group.chatName,
        users: groupMemberIds,
      }
    )
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    if (groupResponse) {
      toastify({
        open: true,
        type: "success",
        message: `Group ${createMode ? "created" : "updated"} successfully.`,
      });
      setFetchAgain(!fetchAgain);
      setChat(groupResponse);
    } else {
      toastify({
        open: true,
        type: "error",
        message: "Unable to create group.",
      });
    }
    onClose();
  };

  const handleAddUser = (user) => {
    setGroup((prev) => ({
      ...prev,
      users: [...prev.users, user],
    }));
    setGroupMemberIds((prev) => [...prev, user._id]);
    setSearchUsers("");
    setSearchUsersResult([]);
  };

  const handleRemoveUser = (user) => {
    setGroup((prev) => ({
      ...prev,
      users: prev.users.filter((u) => u._id !== user._id),
    }));
    setGroupMemberIds((prev) => prev.filter((id) => id !== user._id));
  };

  const fetchUsers = async (value) => {
    const usersResponse = await AxiosClient.get(`/api/user?search=${value}`)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    const filteredUsers = usersResponse.filter(
      (user) => !groupMemberIds.includes(user._id)
    );

    setSearchUsersResult(filteredUsers);
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchUsers(value);

    setIsLoading(true);
    fetchUsers(value);
  };

  useEffect(() => {
    setEditMode(createMode);
    if (createMode) {
      setGroup({ chatName: "", users: [] });
      setGroupMemberIds([]);
    } else {
      setGroup(groupData);
      setGroupMemberIds(groupData?.users?.map((user) => user._id) || []);
    }
  }, [open]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            display={"flex"}
            gap={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {createMode ? "Create new Group" : group?.chatName}
            </Typography>
            <IconButton onClick={onClose}>
              <Clear />
            </IconButton>
          </Box>
          <Divider />
          <Box display={"flex"} gap={2} py={2}>
            <Button
              component="label"
              variant="contained"
              sx={{
                position: "relative",
                padding: 0,
                boxShadow: 0,
                borderRadius: "50%",
                "&:hover": {
                  boxShadow: 0,
                  "& .MuiBox-root": { display: "flex" },
                },
              }}
            >
              <Avatar
                src={groupPic}
                sx={{
                  width: 64,
                  height: 64,
                }}
              />
              <VisuallyHiddenInput onChange={handlePicChange} type="file" />
              <Box
                bgcolor={alpha("#000", 0.3)}
                zIndex={10}
                position="absolute"
                height="100%"
                width="100%"
                borderRadius="50%"
                top={0}
                left={0}
                display="none"
                justifyContent="center"
                alignItems="center"
              >
                <Edit />
              </Box>
            </Button>
            <Box flexGrow={1} display={"flex"} alignItems={"center"}>
              {!editMode ? (
                <Typography flexGrow={1}>{group?.chatName}</Typography>
              ) : (
                <TextField
                  name="group-name"
                  label="Group Name"
                  size="small"
                  sx={{ flexGrow: 1 }}
                  value={group?.chatName}
                  onChange={(e) =>
                    setGroup({ ...group, chatName: e.target.value })
                  }
                />
              )}
              <IconButton onClick={() => setEditMode(!editMode)}>
                {!editMode ? (
                  <Edit fontSize="small" />
                ) : (
                  <Check fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Box>
          <Box position={"relative"} pb={1}>
            <TextField
              name="search"
              placeholder="Search user to add..."
              size="small"
              fullWidth
              sx={{ borderRadius: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              value={searchUsers}
              onChange={handleSearch}
            />
            {searchUsers && (
              <Box
                position={"absolute"}
                bgcolor={"white"}
                color={"black"}
                width={"100%"}
                borderRadius={5}
                display={"flex"}
                flexDirection={"column"}
                maxHeight={192}
                overflow={"auto"}
                zIndex={10}
                boxShadow={5}
              >
                {isLoading ? (
                  <Box
                    height={128}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                ) : searchUsersResult?.length ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    overflow={"auto"}
                    p={1}
                  >
                    {searchUsersResult.map((user) => (
                      <Box
                        key={user?._id}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        p={0.5}
                        sx={(theme) => ({
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                          },
                        })}
                        onClick={() => handleAddUser(user)}
                      >
                        <Avatar src={user.pic} />
                        <Box flexGrow={1}>
                          <Typography>{user.name}</Typography>
                          <Typography variant="caption">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    height={128}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="button">No users found</Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Box pb={1}>
            <Typography pb={1} fontWeight={600}>
              MEMBERS({groupMemberIds.length})
            </Typography>
            <Stack sx={{ overflow: "auto" }}>
              {groupMemberIds.length ? (
                group?.users?.map((member) => (
                  <Box p={0.5} display={"flex"} gap={1} alignItems={"center"}>
                    <Avatar src={member?.pic} />
                    <Typography flexGrow={1}>{member?.name}</Typography>
                    {member?._id === group?.groupAdmin?._id ? (
                      <Chip label="Admin" />
                    ) : (
                      <IconButton onClick={() => handleRemoveUser(member)}>
                        <Clear fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))
              ) : (
                <Typography pb={1}>No members added</Typography>
              )}
            </Stack>
          </Box>
          <Divider />
          <Box pt={2} sx={{ float: "right" }}>
            {!createMode && (
              <Button
                variant="contained"
                color="error"
                disableElevation
                sx={{ borderRadius: 2 }}
              >
                Leave Group
              </Button>
            )}
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: 2, ml: 1 }}
              onClick={handleSaveGroup}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GroupModal;
