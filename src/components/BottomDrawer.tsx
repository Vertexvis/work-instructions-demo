import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { getDrawerUtilityClass } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import {
  ChevronLeft,
  ChevronRight,
  PlayArrow,
  Refresh,
} from "@material-ui/icons";
import React from "react";

import { SceneViewState, SceneViewStates } from "../lib/scene-items";
import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (sceneViewId?: SceneViewState) => void;
  readonly ready: boolean;
}

const FabMargin = 5;

const Drawer = styled((props) => (
  <MuiDrawer anchor="bottom" variant="permanent" {...props} />
))(() => {
  return {
    [`& .${getDrawerUtilityClass("paper")}`]: { height: BottomDrawerHeight },
  };
});

export function BottomDrawer({ onSelect, ready }: Props): JSX.Element {
  const stepIds = Object.keys(SceneViewStates);
  const [activeStep, setActiveStep] = React.useState(-1);

  React.useEffect(() => {
    onSelect(SceneViewStates[stepIds[activeStep]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <Drawer>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Fab
          disabled={!ready || activeStep === -1 || activeStep === 0}
          sx={{ ml: FabMargin, mr: "auto" }}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          <ChevronLeft />
        </Fab>
        <Box sx={{ my: 2, width: "75%" }}>
          <Stepper activeStep={activeStep}>
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
        </Box>
        {activeStep === stepIds.length - 1 ? (
          <Fab
            disabled={!ready}
            sx={{ ml: "auto", mr: FabMargin }}
            onClick={() => setActiveStep(-1)}
          >
            <Refresh />
          </Fab>
        ) : (
          <Fab
            disabled={!ready}
            sx={{ ml: "auto", mr: FabMargin }}
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            <ChevronRight />
          </Fab>
        )}
      </Box>
    </Drawer>
  );
}
