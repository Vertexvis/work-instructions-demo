import { Box, Button, TextField } from "@material-ui/core";
import React from "react";

interface Props {
  readonly onCreateSceneViewState: (name: string) => void;
  readonly onRenderPartRevision: () => void;
}

export function Header({
  onCreateSceneViewState,
  onRenderPartRevision,
}: Props): JSX.Element {
  const [name, setName] = React.useState<string>("");

  return (
    <Box display="flex" width="100%">
      <TextField
        id="svs-name"
        label="Name"
        onChange={(e) => setName(e.target.value)}
        size="small"
        sx={{ mr: 2 }}
        value={name}
      />
      <Button
        onClick={() => {
          if (!name) return;

          onCreateSceneViewState(name);
        }}
        sx={{ mr: 2 }}
      >
        Create Snapshot
      </Button>
      <Button onClick={() => onRenderPartRevision()} sx={{ mr: 2 }}>
        Render Selected Part
      </Button>
    </Box>
  );
}
