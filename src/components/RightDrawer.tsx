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

import { RightDrawerWidth } from "./Layout";

export type Content = "settings" | "instructions";

interface Props {
  readonly content?: Content;
  readonly onClose: () => void;
  readonly settings: { onGhostToggle: (checked: boolean) => void };
}

const Drawer = styled(MuiDrawer)(() => ({
  width: RightDrawerWidth,
  [`& .${drawerClasses.paper}`]: { width: RightDrawerWidth },
}));

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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="h5">Settings</Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
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
          <>TODO</>
        )}
      </Box>
    </Drawer>
  );
}
