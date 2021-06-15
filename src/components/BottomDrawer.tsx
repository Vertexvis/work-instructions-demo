import {
  Box,
  Drawer as MuiDrawer,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@material-ui/core";
import { getDrawerUtilityClass } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import React from "react";

import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (sceneViewId: string) => void;
}

// Temporary until this revert is published, https://github.com/mui-org/material-ui/pull/26310
const ChevronLeft = dynamic(() => import("@material-ui/icons/ChevronLeft"), {
  ssr: false,
});
const ChevronRight = dynamic(() => import("@material-ui/icons/ChevronRight"), {
  ssr: false,
});

const Drawer = styled((props) => (
  <MuiDrawer anchor="bottom" variant="permanent" {...props} />
))(() => {
  return {
    [`& .${getDrawerUtilityClass("paper")}`]: { height: BottomDrawerHeight },
  };
});

export function BottomDrawer({ onSelect }: Props): JSX.Element {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  const step =
    selected && sceneViewStates[selected] ? sceneViewStates[selected].step : 1;

  return (
    <Drawer>
      <Typography align="center" sx={{ my: 1 }}>
        {`Step ${step} of 3`}
      </Typography>
      <Box
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        <Fab sx={{ ml: 2, mr: "auto" }}>
          <ChevronLeft />
        </Fab>
        <ToggleButtonGroup
          exclusive
          onChange={(_e: React.MouseEvent, sel: string) => {
            setSelected(sel);
            onSelect(sel);
          }}
          value={selected}
        >
          {Object.keys(sceneViewStates).map((k) => (
            <ToggleButton key={k} value={k}>
              <img
                width={180}
                key={k}
                src={`/${k}.png`}
                alt={sceneViewStates[k].name}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Fab sx={{ ml: "auto", mr: 2 }}>
          <ChevronRight />
        </Fab>
      </Box>
    </Drawer>
  );
}

const sceneViewStates: Record<string, { step: number; name: string }> = {
  "87ace158-ffec-4d3a-bc9b-d3689798edf2": { step: 1, name: "Step 1: Rim" },
  "a9f3ac57-b706-4ce6-91b6-bbe67c924468": {
    step: 2,
    name: "Step 2: Tire onto rim",
  },
  "ff1acbb0-8906-436e-83b8-d518bbfc75e9": {
    step: 3,
    name: "Step 3: Lug nuts into rim",
  },
};
