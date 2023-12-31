import { Clear, Edit, People } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";

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

const ProfileModal = ({ userData, open, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({});

  const { user } = useContext(UserContext);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = file ? URL.createObjectURL(file) : "";
    setProfile({ ...profile, pic: fileUrl });
  };

  const handleSave = () => {
    console.log("profile :>> ", profile);
    setEditMode(false);
  };

  useEffect(() => {
    setEditMode(false);
    setProfile(userData);
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
            <People />
            <IconButton onClick={onClose}>
              <Clear />
            </IconButton>
          </Box>
          <Divider />
          <Stack py={2} gap={1} alignItems="center">
            <Button
              disableRipple
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
                src={profile.pic}
                sx={{
                  width: 128,
                  height: 128,
                }}
              />
              {editMode && (
                <VisuallyHiddenInput onChange={handlePicChange} type="file" />
              )}
              {editMode && (
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
              )}
            </Button>
            <Box>
              {!editMode ? (
                <Typography variant="h4">{profile.name}</Typography>
              ) : (
                <TextField
                  name="user-name"
                  label="Name"
                  size="small"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              )}
            </Box>
            <Box>
              {!editMode ? (
                <Typography>{profile.email}</Typography>
              ) : (
                <TextField
                  name="e-mail"
                  label="E-mail"
                  size="small"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              )}
            </Box>
          </Stack>
          <Divider />
          <Box pt={2} sx={{ float: "right" }}>
            <Button
              variant="contained"
              color="grey"
              disableElevation
              sx={{ borderRadius: 2 }}
            >
              Close
            </Button>
            {user?._id === profile._id &&
              (editMode ? (
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ borderRadius: 2, ml: 1 }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ borderRadius: 2, ml: 1 }}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProfileModal;
