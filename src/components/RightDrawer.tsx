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

import { InstructionStep } from "../lib/work-instructions";
import {
  BottomDrawerHeight,
  DenseToolbarHeight,
  RightDrawerWidth,
} from "./Layout";

export type Content = "settings" | "instructions";

interface Props {
  readonly content?: Content;
  readonly instructionStep?: InstructionStep;
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

export function RightDrawer({
  content,
  instructionStep,
  onClose,
  settings,
}: Props): JSX.Element {
  if (content == null) return <></>;

  function Instructions() {
    function NoContent(): JSX.Element {
      return instructionStep == null ? (
        <Typography gutterBottom>No instruction steps active.</Typography>
      ) : (
        <Typography gutterBottom>No instructions provided.</Typography>
      );
    }

    const stepNum = instructionStep?.step
      ? `Step ${instructionStep.step} `
      : "";

    return (
      <>
        <Header onClose={onClose} title={`${stepNum}Instructions`} />
        {instructionStep != null && instructionStep.instructions.length > 0 ? (
          instructionStep?.instructions.map((t, i) => (
            <Typography gutterBottom key={i}>
              {`${i + 1}. `}
              {t}
            </Typography>
          ))
        ) : (
          <NoContent />
        )}
      </>
    );
  }

  function Settings() {
    return (
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
    );
  }

  return (
    <Drawer
      anchor="right"
      open={content != null}
      sx={{ flexShrink: 0 }}
      variant="persistent"
    >
      <Box sx={{ p: 1 }}>
        {content === "settings" ? <Settings /> : <Instructions />}
      </Box>
    </Drawer>
  );
}
