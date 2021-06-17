import { Box, Drawer as MuiDrawer } from "@material-ui/core";
import { drawerClasses } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import React from "react";

import { InstructionStep } from "../lib/work-instructions";
import { Instructions } from "./Instructions";
import { BottomDrawerHeight, RightDrawerWidth } from "./Layout";
import { Parts } from "./Parts";
import { Settings, SettingsProps } from "./Settings";

export type Content = "settings" | "instructions" | "parts";

interface Props {
  readonly content?: Content;
  readonly instructionStep?: InstructionStep;
  readonly onClose: () => void;
  readonly settings: SettingsProps;
}

const Drawer = styled(MuiDrawer)(() => ({
  width: RightDrawerWidth,
  [`& .${drawerClasses.paper}`]: {
    height: `calc(100% - ${BottomDrawerHeight}px)`,
    width: RightDrawerWidth,
  },
}));

export function RightDrawer({
  content,
  instructionStep,
  onClose,
  settings,
}: Props): JSX.Element {
  if (content == null) return <></>;

  function Content() {
    if (content === "settings")
      return <Settings onClose={onClose} settings={settings} />;
    if (content === "instructions")
      return <Instructions onClose={onClose} step={instructionStep} />;
    return <Parts onClose={onClose} step={instructionStep} />;
  }

  return (
    <Drawer
      anchor="right"
      open={content != null}
      sx={{ flexShrink: 0 }}
      variant="persistent"
    >
      <Box sx={{ p: 1 }}>
        <Content />
      </Box>
    </Drawer>
  );
}
