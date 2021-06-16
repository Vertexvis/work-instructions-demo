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

import { SceneViewState, SceneViewStates } from "../lib/scene-items";
import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (sceneViewId?: SceneViewState) => void;
  readonly ready: boolean;
}

const ButtonMargin = 5;

const Drawer = styled((props) => (
  <MuiDrawer anchor="bottom" variant="permanent" {...props} />
))(() => {
  return {
    [`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
  };
});

const StepConnector = styled((props) => <MuiStepConnector {...props} />)(() => {
  return {
    [`& .${stepConnectorClasses.line}`]: {
      borderWidth: 0,
    },
  };
});

export function BottomDrawer({ onSelect, ready }: Props): JSX.Element {
  const stepIds = Object.keys(SceneViewStates);
  const [activeStep, setActiveStep] = React.useState(-1);

  React.useEffect(() => {
    onSelect(SceneViewStates[stepIds[activeStep]]);
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
      <>
        <Reset />
        <Done />
      </>
    ) : (
      <Next />
    );
  }

  return (
    <Drawer>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box sx={{ minWidth: 215 }}>
          <Prev />
        </Box>
        <Stepper
          activeStep={activeStep}
          connector={<StepConnector />}
          sx={{ flexGrow: 1, mx: 10, my: 2 }}
        >
          {Object.keys(SceneViewStates).map((k) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={k} {...stepProps}>
                <StepLabel></StepLabel>
                <img
                  height={150}
                  key={k}
                  src={`/${k}.png`}
                  alt={SceneViewStates[k].name}
                />
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ display: "flex", minWidth: 215 }}>{getRightButton()}</Box>
      </Box>
    </Drawer>
  );
}
