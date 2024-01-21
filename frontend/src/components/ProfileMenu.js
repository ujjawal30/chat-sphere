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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProfileMenu = ({
  anchorEl,
  handleClose,
  onGroupModalOpen,
  onProfileModalOpen,
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

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
      <MenuItem disableRipple sx={{ lineHeight: 0 }}>
        <ListItemIcon>
          <Avatar src={user?.pic} sx={{ width: 64, height: 64 }} />
        </ListItemIcon>
        <Box px={1}>
          <Typography>{user?.name}</Typography>
          <Typography variant="caption">{user?.email}</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onProfileModalOpen}>
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
      <MenuItem onClick={onGroupModalOpen}>
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
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
