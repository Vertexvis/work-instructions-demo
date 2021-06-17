import { Typography } from "@material-ui/core";
import React from "react";

export function TypographyGutter({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Typography gutterBottom>{children}</Typography>;
}
