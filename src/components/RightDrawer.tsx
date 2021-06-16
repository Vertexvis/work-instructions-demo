import {
  Box,
  Drawer as MuiDrawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@material-ui/core";
import { drawerClasses } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React from "react";

import {
  BottomDrawerHeight,
  DenseToolbarHeight,
  RightDrawerWidth,
} from "./Layout";

export type Content = "settings" | "instructions";

interface Props {
  readonly content?: Content;
  readonly onClose: () => void;
  readonly settings: { onGhostToggle: (checked: boolean) => void };
}

const Drawer = styled(MuiDrawer)(() => ({
  width: RightDrawerWidth,
  [`& .${drawerClasses.paper}`]: {
    height: `calc(100% - ${BottomDrawerHeight + DenseToolbarHeight}px)`,
    width: RightDrawerWidth,
  },
}));

function Header({
  onClose,
  title,
}: {
  readonly onClose: () => void;
  readonly title: string;
}) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Box>
  );
}

const instructions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utvitae erat ac massa mattis blandit id a mi. Morbi nibh lacus,pellentesque tincidunt malesuada ac, cursus ornare urna.Suspendisse vel volutpat sapien, nec porta diam. In imperdiet velmagna sed varius.",
  "Cras semper volutpat tortor eget euismod. Nam in leo in arcudignissim tempus. Suspendisse maximus euismod metus, tempusconsectetur dolor vestibulum quis. Nulla et lacinia metus. Nam velmauris at est ultricies vestibulum. Proin rhoncus nulla ut elitpretium vehicula.",
  "Ut orci nunc, semper et ultricies ut, iaculis mattis nulla. Donec tincidunt est ac erat efficitur, nec cursus velit pellentesque. Duis hendrerit blandit porta. In faucibus arcuipsum, quis pharetra tortor iaculis at. Vivamus rhoncus mi egetlibero egestas tincidunt. Sed ultrices nulla sit amet tortorrhoncus volutpat.",
];

export function RightDrawer({
  content,
  onClose,
  settings,
}: Props): JSX.Element {
  if (content == null) return <></>;

  return (
    <Drawer
      anchor="right"
      open={content != null}
      sx={{ flexShrink: 0 }}
      variant="persistent"
    >
      <Box sx={{ p: 1 }}>
        {content === "settings" ? (
          <>
            <Header onClose={onClose} title="Settings" />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={(e) => settings.onGhostToggle(e.target.checked)}
                  />
                }
                label="Ghosted geometry"
              />
            </FormGroup>
          </>
        ) : (
          <>
            <Header onClose={onClose} title="Instructions" />
            {instructions.map((t, i) => (
              <Typography gutterBottom key={i}>{`${i + 1}. ${t}`}</Typography>
            ))}
          </>
        )}
      </Box>
    </Drawer>
  );
}
