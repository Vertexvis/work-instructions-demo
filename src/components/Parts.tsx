import { Box } from "@material-ui/core";
import React from "react";

import { InstructionStep } from "../lib/work-instructions";
import { ContentHeader } from "./ContentHeader";
import { NoStepActive } from "./NoStepActive";
import { TypographyGutter } from "./TypographyGutter";

interface Props {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}

export function Parts({ onClose, step }: Props): JSX.Element {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <TypographyGutter>No parts provided.</TypographyGutter>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum}Parts`} />
      {step?.parts != null && step.parts.length > 0 ? (
        step?.parts.map((p, i) => (
          <Box
            key={i}
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              height={120}
              src={`/${p.id}.png`}
              alt={`Part revision ${p.id}`}
            />
            <TypographyGutter>{`x ${p.quantity}`}</TypographyGutter>
          </Box>
        ))
      ) : (
        <NoContent />
      )}
    </>
  );
}
