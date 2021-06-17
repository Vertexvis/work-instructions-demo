import React from "react";

import { InstructionStep } from "../lib/work-instructions";
import { ContentHeader } from "./ContentHeader";
import { NoStepActive } from "./NoStepActive";
import { TypographyGutter } from "./TypographyGutter";

interface Props {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}

export function Instructions({ onClose, step }: Props): JSX.Element {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <TypographyGutter>No instructions provided.</TypographyGutter>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum}Instructions`} />
      {step?.instructions != null && step.instructions.length > 0 ? (
        step?.instructions.map((t, i) => (
          <TypographyGutter key={i}>
            {`${i + 1}. `}
            {t}
          </TypographyGutter>
        ))
      ) : (
        <NoContent />
      )}
    </>
  );
}
