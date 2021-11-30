import { Instructions } from "@components/Instructions";
import { BottomDrawerHeight, RightDrawerWidth } from "@components/Layout";
import { Parts } from "@components/Parts";
import { Settings, SettingsProps } from "@components/Settings";
import { InstructionStep } from "@lib/work-instructions";
import Box from "@mui/material/Box";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import React from "react";

export type Content = "settings" | "instructions" | "parts";

interface Props {
  readonly content?: Content;
  readonly instructionStep?: InstructionStep;
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly onShow: (name: string, ids: string[]) => void;
  readonly settings: SettingsProps;
}

export function RightDrawer({
  content,
  instructionStep,
  onBeginAssembly,
  onClose,
  open,
  onShow,
  settings,
}: Props): JSX.Element {
  if (content == null) return <></>;

  function Content() {
    if (content === "settings")
      return <Settings onClose={onClose} settings={settings} />;
    if (content === "instructions")
      return (
        <Instructions
          onBeginAssembly={onBeginAssembly}
          onClose={onClose}
          onShow={onShow}
          step={instructionStep}
        />
      );
    return <Parts onClose={onClose} onShow={onShow} step={instructionStep} />;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      sx={{
        flexShrink: 0,
        width: RightDrawerWidth,
        [`& .${drawerClasses.paper}`]: {
          height: `calc(100% - ${BottomDrawerHeight}px)`,
          width: RightDrawerWidth,
        },
      }}
      variant="persistent"
    >
      <Box sx={{ p: 2 }}>
        <Content />
      </Box>
    </Drawer>
  );
}
