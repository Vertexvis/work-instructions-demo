import { ContentHeader } from "@components/ContentHeader";
import { NoStepActive } from "@components/NoStepActive";
import { InstructionStep } from "@lib/work-instructions";
import { Box, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  readonly onClose: () => void;
  readonly step?: InstructionStep;
}

export function Parts({ onClose, step }: Props): JSX.Element {
  function NoContent(): JSX.Element {
    return step == null ? (
      <NoStepActive />
    ) : (
      <Typography sx={{ mb: 2 }}>No parts provided.</Typography>
    );
  }

  const stepNum = step?.step ? `Step ${step.step} ` : "";
  return (
    <>
      <ContentHeader onClose={onClose} title={`${stepNum} Parts`} />
      {step?.parts != null && step.parts.length > 0 ? (
        step?.parts.map((p, i) => (
          <Box
            key={i}
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Part revision thumbnail for scene item ${p.sceneItemSuppliedId}`}
              height={120}
              src={`/${p.sceneItemSuppliedId}.png`}
            />
            <Typography sx={{ mb: 2 }}>{`x ${p.quantity}`}</Typography>
          </Box>
        ))
      ) : (
        <NoContent />
      )}
    </>
  );
}
