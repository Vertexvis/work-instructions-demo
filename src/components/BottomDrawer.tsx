import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  Step,
  StepConnector as MuiStepConnector,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { drawerClasses } from "@material-ui/core/Drawer";
import { stepConnectorClasses } from "@material-ui/core/StepConnector";
import { styled } from "@material-ui/core/styles";
import { Check, ChevronLeft, ChevronRight, Refresh } from "@material-ui/icons";
import React from "react";

import { InstructionStep, InstructionSteps } from "../lib/work-instructions";
import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (is?: InstructionStep) => void;
  readonly ready: boolean;
}

const ButtonMargin = 5;

const Drawer = styled(MuiDrawer)(() => ({
  [`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
}));

const StepConnector = styled(MuiStepConnector)(() => ({
  [`& .${stepConnectorClasses.line}`]: {
    marginLeft: 20,
  },
}));

export function BottomDrawer({ onSelect, ready }: Props): JSX.Element {
  const stepIds = Object.keys(InstructionSteps);
  const [activeStep, setActiveStep] = React.useState(-1);

  React.useEffect(() => {
    onSelect(InstructionSteps[stepIds[activeStep]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, ready]);

  function Prev() {
    return (
      <Fab
        disabled={!ready || activeStep === -1 || activeStep === 0}
        sx={{ ml: ButtonMargin, mr: "auto" }}
        onClick={() => setActiveStep((prev) => prev - 1)}
      >
        <ChevronLeft />
      </Fab>
    );
  }

  function Next() {
    return (
      <Fab
        disabled={!ready}
        sx={{ ml: "auto", mr: ButtonMargin }}
        onClick={() => setActiveStep((prev) => prev + 1)}
      >
        <ChevronRight />
      </Fab>
    );
  }

  function Done() {
    return (
      <Fab
        color={"primary"}
        disabled={!ready || activeStep >= stepIds.length}
        sx={{ ml: "auto", mr: ButtonMargin }}
        onClick={() => setActiveStep((prev) => prev + 1)}
        variant="extended"
      >
        <Check sx={{ mr: 1 }} />
        Done
      </Fab>
    );
  }

  function Reset() {
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

  function getRightButton() {
    return activeStep >= stepIds.length - 1 ? (
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Reset />
        <Done />
      </Box>
    ) : (
      <Next />
    );
  }

  return (
    <Drawer anchor="bottom" variant="permanent">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 2,
        }}
      >
        <Box sx={{ minWidth: 215 }}>
          <Prev />
        </Box>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<StepConnector />}
          sx={{ flexGrow: 1 }}
        >
          {Object.keys(InstructionSteps).map((k) => {
            return (
              <Step key={k}>
                <StepLabel sx={{ mr: 0 }}></StepLabel>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <img
                    height={120}
                    key={k}
                    src={`/${k}.png`}
                    alt={InstructionSteps[k].name}
                  />
                </Box>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ display: "flex", minWidth: 215 }}>{getRightButton()}</Box>
      </Box>
    </Drawer>
  );
}
