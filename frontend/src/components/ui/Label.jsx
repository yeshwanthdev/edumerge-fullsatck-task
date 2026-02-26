import React from "react";
import { Box, Typography } from "@mui/material";

const Label = ({ label, value }) => {
  return (
    <Box mb={1}>
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body1">{value ?? "-"}</Typography>
    </Box>
  );
};

export default Label;
