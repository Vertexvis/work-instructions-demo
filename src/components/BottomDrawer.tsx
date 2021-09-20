import { BottomDrawerHeight } from "@components/Layout";
import { InstructionSteps } from "@lib/work-instructions";
import { Check, ChevronLeft, ChevronRight, Refresh } from "@mui/icons-material";
import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { drawerClasses } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import React from "react";

interface Props {
  readonly activeStep: number;
  readonly onSelect: (activeStep: number) => void;
  readonly ready: boolean;
  readonly stepIds: string[];
}

const BtnMargin = 5;

const Drawer = styled(MuiDrawer)(() => ({
  [`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
}));

export function BottomDrawer({
  activeStep,
  onSelect,
  ready,
  stepIds,
}: Props): JSX.Element {
  function PrevBtn() {
    return (
      <Fab
        disabled={!ready || activeStep === -1 || activeStep === 0}
        sx={{ mx: BtnMargin }}
        onClick={() => onSelect(activeStep - 1)}
      >
        <ChevronLeft />
      </Fab>
    );
  }

  function NextBtn() {
    return (
      <Fab
        disabled={!ready}
        sx={{ mx: BtnMargin }}
        onClick={() => onSelect(activeStep + 1)}
      >
        <ChevronRight />
      </Fab>
    );
  }

  function DoneBtn() {
    return (
      <Fab
        color={"primary"}
        disabled={!ready || activeStep >= stepIds.length}
        sx={{ mr: BtnMargin }}
        onClick={() => onSelect(activeStep + 1)}
      >
        <Check />
      </Fab>
    );
  }

  function ResetBtn() {
    return (
      <Fab
        disabled={!ready}
        sx={{ mx: BtnMargin }}
        onClick={() => onSelect(-1)}
      >
        <Refresh />
      </Fab>
    );
  }

  function Steps() {
    return (
      <Stepper activeStep={activeStep} alternativeLabel sx={{ flexGrow: 1 }}>
        {Object.keys(InstructionSteps).map((k) => {
          return (
            <Step key={k}>
              <StepButton
                disabled={false}
                onClick={() => onSelect(InstructionSteps[k].step - 1)}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    height={120}
                    key={k}
                    src={`/${k}.png`}
                    alt={`Step ${InstructionSteps[k].step}`}
                  />
                </Box>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  }

  function getRightBtn() {
    return activeStep >= stepIds.length - 1 ? (
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <ResetBtn />
        <DoneBtn />
      </Box>
    ) : (
      <NextBtn />
    );
  }

  const minWidth = 232;
  return (
    <Drawer anchor="bottom" variant="permanent">
      <Box sx={{ alignItems: "center", display: "flex", mt: 2 }}>
        <Box sx={{ minWidth: minWidth / 2 }}>
          <PrevBtn />
        </Box>
        <Steps />
        <Box sx={{ display: "flex", minWidth }}>{getRightBtn()}</Box>
      </Box>
    </Drawer>
  );
}
