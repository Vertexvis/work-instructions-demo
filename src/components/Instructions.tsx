import { List, ListItem, Typography } from "@material-ui/core";
import React from "react";

import { InstructionStep } from "../lib/work-instructions";
import { ContentHeader } from "./ContentHeader";
import { NoStepActive } from "./NoStepActive";

interface Props {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}

export function Instructions({ onClose, step }: Props): JSX.Element {
  function NoContent(): JSX.Element {
    return step == null ? <NoStepActive /> : <></>;
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum}Instructions`} />
      {step?.title && (
        <Typography gutterBottom sx={{ ml: 1 }} variant="h6">
          {step?.title}
        </Typography>
      )}
      {step?.instructions != null && step.instructions.length > 0 ? (
        <List>
          {step?.instructions.map((t, i) => (
            <ListItem key={i}>
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
