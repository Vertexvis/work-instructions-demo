import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  LinearProgress,
  ImageList,
  ImageListItem,
  Step,
  StepConnector as MuiStepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
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

const Drawer = styled(MuiDrawer)(() => ({
  [`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
}));

const StepConnector = styled(MuiStepConnector)(() => ({
  [`& .${stepConnectorClasses.line}`]: {
    // marginRight: 0,
    // marginLeft: 0,
    // marginTop: -88,
    // padding: 0,
  },
}));

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
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex" }}>
            <LinearProgress
              variant="determinate"
              value={(Math.min(activeStep, 3) / 3) * 100}
              sx={{ mt: 1, mr: 2, width: "90%" }}
            />
            <Typography>{`Step ${Math.min(
              activeStep + 1,
              3
            )} of 3`}</Typography>
          </Box>
          <ImageList sx={{ width: "100%" }} cols={3}>
            {Object.keys(SceneViewStates).map((k) => {
              return (
                <Box key={k} sx={{ ml: 5 }}>
                  <img
                    height={120}
                    src={`/${k}.png`}
                    alt={SceneViewStates[k].name}
                  />
                </Box>
              );
            })}
          </ImageList>
        </Box>
        <Box sx={{ display: "flex", minWidth: 215 }}>{getRightButton()}</Box>
      </Box>
    </Drawer>
  );
}
