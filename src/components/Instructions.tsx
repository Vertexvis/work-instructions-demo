import { ContentHeader } from "@components/ContentHeader";
import {
  Instructions as InstructionsType,
  InstructionStep,
} from "@lib/work-instructions";
import MapOutlined from "@mui/icons-material/MapOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import WidgetsOutlined from "@mui/icons-material/WidgetsOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  readonly instructions: InstructionsType;
  readonly onBeginAssembly: () => void;
  readonly onClose: () => void;
  readonly onShow: (name: string, ids: string[]) => void;
  readonly step?: InstructionStep;
}

export function Instructions({
  instructions,
  onBeginAssembly,
  onClose,
  onShow,
  step,
}: Props): JSX.Element {
  const numSteps = Object.keys(instructions.steps).length;

  function NoContent(): JSX.Element {
    return step == null ? (
      <>
        <ContentHeader onClose={onClose} title={instructions.title} />
        <Typography sx={{ mb: 6 }}>{instructions.description}</Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <MapOutlined sx={{ mr: 1 }} />
          <Typography>{`${numSteps} steps`}</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <WidgetsOutlined sx={{ mr: 1 }} />
          <Typography>{instructions.partCount} parts</Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 6 }}>
          <TimerOutlined sx={{ mr: 1 }} />
          <Typography>
            {instructions.completionMins} minutes to complete
          </Typography>
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
        typeof step.instructions === "function" ? (
          <List>
            {step.instructions(onShow).map((t, i) => (
              <InstructionContent content={t} key={i} index={i} />
            ))}
          </List>
        ) : (
          <List>
            {step.instructions.map((t, i) => (
              <InstructionContent content={t} key={i} index={i} />
            ))}
          </List>
        )
      ) : (
        <NoContent />
      )}
    </>
  );
}

interface InstructionContentProps {
  content: string | React.ReactNode;
  index: number;
}

function InstructionContent({
  content,
  index,
}: InstructionContentProps): JSX.Element {
  return (
    <Typography key={index} sx={{ mb: 2 }}>
      {`${index + 1}. `}
      {content}
    </Typography>
  );
}
