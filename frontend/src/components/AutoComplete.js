import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";

const AutoComplete = ({ resultSet, loading }) => {
  const handleSearchItemClick = () => {
    console.log("<<: Search Item Clicked :>>");
  };

  return (
    <Box
      position={"absolute"}
      bgcolor={"white"}
      color={"black"}
      width={"100%"}
      borderRadius={5}
      display={"flex"}
      flexDirection={"column"}
      maxHeight={256}
      overflow={"auto"}
      zIndex={10}
      boxShadow={5}
    >
      {loading ? (
        <Box
          height={192}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : resultSet?.length ? (
        <Box display={"flex"} flexDirection={"column"} overflow={"auto"} p={1}>
          {resultSet.map((user) => (
            <Box
              key={user?._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              p={1}
              borderRadius={2}
              sx={(theme) => ({
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                "& .MuiTypography-root": {
                  lineHeight: 1.2,
                },
              })}
              onClick={handleSearchItemClick}
            >
              <Avatar src={user?.pic} sx={{ width: 40, height: 40 }} />
              <Stack flexGrow={1}>
                <Typography
                  variant="subtitle2"
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  fontWeight={600}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="caption"
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                >
                  {user?.email}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          height={192}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="button">No users found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AutoComplete;
