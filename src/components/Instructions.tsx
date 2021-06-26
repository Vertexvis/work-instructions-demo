import { ContentHeader } from "@components/ContentHeader";
import { InstructionStep } from "@lib/work-instructions";
import { Box, Button, List, ListItem, Typography } from "@material-ui/core";
import {
  MapOutlined,
  TimerOutlined,
  WidgetsOutlined,
} from "@material-ui/icons";
import React from "react";

interface Props {
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}

export function Instructions({
  onBeginAssembly,
  onClose,
  step,
}: Props): JSX.Element {
  const numSteps = 4;

  function NoContent(): JSX.Element {
    return step == null ? (
      <>
        <ContentHeader onClose={onClose} title="Spindle Install" />
        <Typography sx={{ mb: 6 }}>
          At this station, the assembly technician assembles the spindle and
          installs it on the vehicle.
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <MapOutlined sx={{ mr: 1 }} />
          <Typography>{`${numSteps} steps`}</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <WidgetsOutlined sx={{ mr: 1 }} />
          <Typography>15 parts</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 6 }}>
          <TimerOutlined sx={{ mr: 1 }} />
          <Typography>5 minutes to complete</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => onBeginAssembly()} variant="contained">
            Begin Assembly
          </Button>
        </Box>
      </>
    ) : (
      <></>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return step == null ? (
    <NoContent />
  ) : (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum} of ${numSteps}`} />
      {step.title && (
        <Typography sx={{ fontWeight: "fontWeightBold", mb: 3 }}>
          {step?.title}
        </Typography>
      )}
      {step.instructions != null && step.instructions.length > 0 ? (
        <List>
          {step.instructions.map((t, i) => (
            <ListItem disableGutters key={i}>
              {`${i + 1}. `}
              {t}
            </ListItem>
          ))}
        </List>
      ) : (
        <NoContent />
      )}
    </>
  );
}
