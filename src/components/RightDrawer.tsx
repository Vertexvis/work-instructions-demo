import { Instructions } from "@components/Instructions";
import { BottomDrawerHeight, RightDrawerWidth } from "@components/Layout";
import { Parts } from "@components/Parts";
import { Settings, SettingsProps } from "@components/Settings";
import { InstructionStep } from "@lib/work-instructions";
import { Box, Drawer as MuiDrawer } from "@material-ui/core";
import { drawerClasses } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import React from "react";

export type Content = "settings" | "instructions" | "parts";

interface Props {
  readonly content?: Content;
  readonly instructionStep?: InstructionStep;
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly onShow: (ids: string[]) => void;
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
  onBeginAssembly,
  onClose,
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
      open={content != null}
      sx={{ flexShrink: 0 }}
      variant="persistent"
    >
      <Box sx={{ p: 2 }}>
        <Content />
      </Box>
    </Drawer>
  );
}
