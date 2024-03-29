import { useContext, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Search, Notifications, Group } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { UserContext } from "../context/UserProvider";

const Navbar = ({ onGroupModalOpen, onProfileModalOpen }) => {
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { user } = useContext(UserContext);

  const toggleSearchBarShow = () => {
    setSearchBarShow(!searchBarShow);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          borderRadius: 3,
          height: "56px",
          justifyContent: "center",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ px: { xs: 3 }, justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: searchBarShow ? "none" : "block", sm: "block" },
            }}
            fontFamily={"Poppins"}
            fontWeight={400}
          >
            ChatSphere
          </Typography>

          <SearchBar active={searchBarShow} onClose={toggleSearchBarShow} />

          <Box
            sx={{
              display: { xs: searchBarShow ? "none" : "flex", sm: "flex" },
            }}
          >
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={toggleSearchBarShow}
            >
              <Search />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={onGroupModalOpen}
            >
              <Group />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Notifications />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar src={user?.pic} sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ProfileMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuClose}
        {...{ onGroupModalOpen, onProfileModalOpen }}
      />
    </Box>
  );
};

export default Navbar;
