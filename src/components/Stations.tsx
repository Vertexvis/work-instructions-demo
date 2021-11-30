import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React from "react";

export function Stations({ sx }: { sx?: SxProps<Theme> }): JSX.Element {
  const [station, setStation] = React.useState(1);

  return (
    <Select
      onChange={(e) => setStation(e.target.value as number)}
      size="small"
      sx={sx}
      value={station}
    >
      <MenuItem value={1}>Station 1</MenuItem>
      <MenuItem value={2}>Station 2</MenuItem>
      <MenuItem value={3}>Station 3</MenuItem>
    </Select>
  );
}
