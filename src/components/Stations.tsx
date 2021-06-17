import { MenuItem, Select } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import React from "react";

export function Stations({ sx }: { sx?: SxProps<Theme> }): JSX.Element {
  const [station, setStation] = React.useState(1);

  return (
    <Select
      onChange={(e) => setStation(e.target.value)}
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
