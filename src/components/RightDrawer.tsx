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
import { BottomDrawerHeight, RightDrawerWidth } from "./Layout";

export type Content = "settings" | "instructions" | "parts";

interface SettingsProps {
  ghosted: boolean;
  onGhostToggle: (checked: boolean) => void;
}

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

function Instructions({
  onClose,
  step,
}: {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}) {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <TypographyGutter>No instructions provided.</TypographyGutter>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <Header onClose={onClose} title={`${stepNum}Instructions`} />
      {step?.instructions != null && step.instructions.length > 0 ? (
        step?.instructions.map((t, i) => (
          <TypographyGutter key={i}>
            {`${i + 1}. `}
            {t}
          </TypographyGutter>
        ))
      ) : (
        <NoContent />
      )}
    </>
  );
}

function Parts({
  onClose,
  step,
}: {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}) {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <TypographyGutter>No parts provided.</TypographyGutter>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <Header onClose={onClose} title={`${stepNum}Parts`} />
      {step?.parts != null && step.parts.length > 0 ? (
        step?.parts.map((p, i) => (
          <Box
            key={i}
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              height={120}
              src={`/${p.id}.png`}
              alt={`Part revision ${p.id}`}
            />
            <TypographyGutter>{`x ${p.quantity}`}</TypographyGutter>
          </Box>
        ))
      ) : (
        <NoContent />
      )}
    </>
  );
}

function Settings({
  onClose,
  settings,
}: {
  readonly onClose: () => void;
  readonly settings: SettingsProps;
}) {
  return (
    <>
      <Header onClose={onClose} title="Settings" />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={settings.ghosted}
              onChange={(e) => settings.onGhostToggle(e.target.checked)}
            />
          }
          label="Ghosted geometry"
        />
      </FormGroup>
    </>
  );
}

function TypographyGutter({ children }: { children: React.ReactNode }) {
  return <Typography gutterBottom>{children}</Typography>;
}

function NoStepActive() {
  return <TypographyGutter>No work instruction steps active.</TypographyGutter>;
}
