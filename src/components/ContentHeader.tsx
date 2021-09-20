import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface Props {
  readonly onClose: () => void;
  readonly title: string;
}

export function ContentHeader({ onClose, title }: Props): JSX.Element {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Box>
  );
}
