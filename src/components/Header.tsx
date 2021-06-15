import { Box, Button, Link, TextField } from "@material-ui/core";
import React from "react";

interface Props {
  onCreateSceneViewState: (name: string) => void;
}

export function Header({ onCreateSceneViewState }: Props): JSX.Element {
  // const [name, setName] = React.useState<string>("");

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      {/* <Box display="flex">
        <TextField
          id="svs-name"
          label="SVS name"
          margin="dense"
          onChange={(e) => setName(e.target.value)}
          sx={{ mr: 2 }}
          value={name}
        />
        <Button
          onClick={() => {
            if (!name) return;

            onCreateSceneViewState(name);
            setName("");
          }}
        >
          Create SVS
        </Button>
      </Box> */}
      <Link
        href="https://github.com/Vertexvis/work-instructions-demo"
        rel="noreferrer"
        style={{ alignSelf: "center" }}
        target="_blank"
      >
        View on GitHub
      </Link>
    </Box>
  );
}
