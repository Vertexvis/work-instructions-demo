import { ContentHeader } from "@components/ContentHeader";
import { InstructionStep } from "@lib/work-instructions";
import {
  MapOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { Box, Button, List, Typography } from "@mui/material";
import React from "react";

interface Props {
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly onShow: (name: string, ids: string[]) => void;
  readonly step?: InstructionStep;
}

export function Instructions({
  onBeginAssembly,
  onClose,
  onShow,
  step,
}: Props): JSX.Element {
  const numSteps = 4;

  function NoContent(): JSX.Element {
    return step == null ? (
      <>
        <ContentHeader onClose={onClose} title="Belt Replacement" />
        <Typography sx={{ mb: 6 }}>
          At this station, the assembly technician replaces the belt.
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <MapOutlined sx={{ mr: 1 }} />
          <Typography>{`${numSteps} steps`}</Typography>
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
      {step.instructions != null ? (
        <List>
          {step.instructions(onShow).map((t, i) => (
            <Typography key={i} sx={{ mb: 2 }}>
              {`${i + 1}. `}
              {t}
            </Typography>
          ))}
        </List>
      ) : (
        <NoContent />
      )}
    </>
  );
}
