import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { drawerClasses } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import { Check, ChevronLeft, ChevronRight, Refresh } from "@material-ui/icons";
import React from "react";

import { InstructionStep, InstructionSteps } from "../lib/work-instructions";
import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (is?: InstructionStep) => void;
  readonly ready: boolean;
}

const BtnMargin = 5;

const Drawer = styled(MuiDrawer)(() => ({
  [`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
}));

export function BottomDrawer({ onSelect, ready }: Props): JSX.Element {
  const stepIds = Object.keys(InstructionSteps);
  const [activeStep, setActiveStep] = React.useState(-1);

  React.useEffect(() => {
    onSelect(InstructionSteps[stepIds[activeStep]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, ready]);

  function PrevBtn() {
    return (
      <Fab
        disabled={!ready || activeStep === -1 || activeStep === 0}
        sx={{ ml: BtnMargin, mr: "auto" }}
        onClick={() => setActiveStep((prev) => prev - 1)}
      >
        <ChevronLeft />
      </Fab>
    );
  }

  function NextBtn() {
    return (
      <Fab
        disabled={!ready}
        sx={{ ml: "auto", mr: BtnMargin }}
        onClick={() => setActiveStep((prev) => prev + 1)}
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
        sx={{ ml: "auto", mr: BtnMargin }}
        onClick={() => setActiveStep((prev) => prev + 1)}
        variant="extended"
      >
        <Check sx={{ mr: 1 }} />
        Done
      </Fab>
    );
  }

  function ResetBtn() {
    return (
      <Fab
        disabled={!ready}
        sx={{ ml: "auto", mr: 2 }}
        onClick={() => setActiveStep(-1)}
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
              <StepLabel sx={{ mr: 0 }}></StepLabel>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  height={120}
                  key={k}
                  src={`/${k}.png`}
                  alt={`Step ${InstructionSteps[k].step}`}
                />
              </Box>
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

  const minWidth = 215;
  return (
    <Drawer anchor="bottom" variant="permanent">
      <Box sx={{ alignItems: "center", display: "flex", mt: 2 }}>
        <Box sx={{ minWidth }}>
          <PrevBtn />
        </Box>
        <Steps />
        <Box sx={{ display: "flex", minWidth }}>{getRightBtn()}</Box>
      </Box>
    </Drawer>
  );
}
