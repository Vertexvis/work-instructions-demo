import {
  Box,
  Drawer as MuiDrawer,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@material-ui/core";
import { getDrawerUtilityClass } from "@material-ui/core/Drawer";
import { styled } from "@material-ui/core/styles";
// import dynamic from "next/dynamic";
import React from "react";

import { SceneViewStates } from "../lib/scene-items";
import { BottomDrawerHeight } from "./Layout";

interface Props {
  readonly onSelect: (sceneViewId: string) => void;
}

// Temporary until this revert is published, https://github.com/mui-org/material-ui/pull/26310
// const ChevronLeft = dynamic(() => import("@material-ui/icons/ChevronLeft"), {
//   ssr: false,
// });
// const ChevronRight = dynamic(() => import("@material-ui/icons/ChevronRight"), {
//   ssr: false,
// });

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
    selected && SceneViewStates[selected] ? SceneViewStates[selected].step : 1;

  return (
    <Drawer>
      <Typography align="center" sx={{ my: 1 }}>
        {`Step ${step} of 3`}
      </Typography>
      <Box
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        {/* <Fab sx={{ ml: 2, mr: "auto" }}>
          <ChevronLeft />
        </Fab> */}
        <ToggleButtonGroup
          exclusive
          onChange={(_e: React.MouseEvent, sel: string) => {
            setSelected(sel);
            onSelect(sel);
          }}
          value={selected}
        >
          {Object.keys(SceneViewStates).map((k) => (
            <ToggleButton key={k} value={k}>
              <img
                width={180}
                key={k}
                src={`/${k}.png`}
                alt={SceneViewStates[k].name}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {/* <Fab sx={{ ml: "auto", mr: 2 }}>
          <ChevronRight />
        </Fab> */}
      </Box>
    </Drawer>
  );
}
