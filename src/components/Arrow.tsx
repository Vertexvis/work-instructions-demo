/* eslint-disable react/no-unknown-property */
/* @jsx jsx */ /** @jsxRuntime classic */ import { jsx } from "@emotion/react";

export function ArrowDown(): JSX.Element {
  const dimensions = 50;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#60A5FA"
      css={{ width: dimensions, height: dimensions }}
    >
      <path
        fillRule="evenodd"
        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowUp(): JSX.Element {
  const dimensions = 50;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#60A5FA"
      css={{ width: dimensions, height: dimensions }}
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
