import {
  Group,
  GroupAdd,
  Logout,
  Notifications,
  Person,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const ProfileMenu = ({ anchorEl, handleClose }) => {
  const { user } = useContext(UserContext);

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{ paper: { elevation: 5 } }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem sx={{ lineHeight: 0 }}>
        <ListItemIcon>
          <Avatar src={user?.user.pic} sx={{ width: 48, height: 48 }} />
        </ListItemIcon>
        <Box px={1}>
          <Typography>{user?.user.name}</Typography>
          <Typography variant="caption">{user?.user.email}</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        My Account
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Notifications fontSize="small" />
        </ListItemIcon>
        Notifications
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <GroupAdd fontSize="small" />
        </ListItemIcon>
        New Group
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
