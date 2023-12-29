import { ArrowBack, Clear, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  alpha,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AutoComplete from "./AutoComplete";
import AxiosClient from "../api/AxiosClient";

const SearchBar = ({ active, onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);

  const fetchUsers = async (value) => {
    const usersResponse = await AxiosClient.get(`/api/user?search=${value}`)
      .then((res) => res.data)
      .catch((err) => console.log("err :>> ", err));

    setSearchResult(usersResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    active && searchRef.current?.children[0]?.children?.search?.focus();
  }, [active]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    setIsLoading(true);
    fetchUsers(value);
  };

  const handleSearchClear = () => setSearchValue("");

  const handleSearchClose = () => {
    active && onClose();
    handleSearchClear();
  };

  const handleSuggestionClick = () => {
    handleSearchClose();
    setSearchResult();
  };

  return (
    <Box
      sx={{
        display: { xs: active ? "block" : "none", sm: "block" },
        width: { xs: "100%", sm: "40%" },
        position: "relative",
      }}
    >
      <TextField
        id="search"
        ref={searchRef}
        placeholder="Start a new chat..."
        InputProps={{
          style: { color: "white" },
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "white" }}>
              {active ? (
                <IconButton
                  onClick={handleSearchClose}
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
                onClick={handleSearchClear}
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
          margin: "auto",
          width: "100%",
          height: "32px",
          "& .MuiInputBase-root": {
            height: "100%",
          },
          "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          "& fieldset": { border: "none" },
        })}
        size="small"
        value={searchValue}
        onChange={handleSearch}
      />
      {searchValue && (
        <AutoComplete
          resultSet={searchResult}
          loading={isLoading}
          onClose={handleSuggestionClick}
        />
      )}
    </Box>
  );
};

export default SearchBar;
