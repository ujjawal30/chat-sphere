import { useState } from "react";
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  Mail,
  Notifications,
  MoreVert,
  Clear,
  ArrowBack,
} from "@mui/icons-material";

const Navbar = () => {
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleSearchBarShow = () => {
    setSearchBarShow(!searchBarShow);
  };

  const clearSearchBar = () => {
    setSearchValue("");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: 5,
          height: "5rem",
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
          >
            ChatSphere
          </Typography>

          <Box
            sx={{
              display: { xs: searchBarShow ? "block" : "none", sm: "block" },
              width: { xs: "100%", sm: "40%" },
            }}
          >
            <TextField
              id="search"
              placeholder="Start a new chat..."
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "white" }}>
                    {searchBarShow ? (
                      <IconButton
                        onClick={toggleSearchBarShow}
                        edge="start"
                        sx={{ color: "white" }}
                      >
                        <ArrowBack />
                      </IconButton>
                    ) : (
                      <Search />
                    )}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ display: searchValue ? "flex" : "none" }}
                  >
                    <IconButton
                      onClick={clearSearchBar}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={(theme) => ({
                borderRadius: 20,
                color: "#fff",
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                "& fieldset": { border: "none" },
                margin: "auto",
                width: "100%",
              })}
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: searchBarShow ? "none" : "block", sm: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={toggleSearchBarShow}
              color="inherit"
            >
              <Search />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
