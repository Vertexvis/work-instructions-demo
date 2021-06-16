import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";

import { Stations } from "./Stations";

interface Props {
  readonly open: boolean;
  readonly onClose: VoidFunction;
  readonly onConfirm: () => void;
}

export function DefectDialog({ open, onClose, onConfirm }: Props): JSX.Element {
  const [issueType, setIssueType] = React.useState(1);
  const [severity, setSeverity] = React.useState(2);

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle>Report an Issue</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="Title" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              onChange={(e) => setIssueType(e.target.value)}
              sx={{ width: "100%" }}
              value={issueType}
            >
              <MenuItem value={1}>Bug</MenuItem>
              <MenuItem value={2}>Feature</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stations sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Location" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              onChange={(e) => setSeverity(e.target.value)}
              sx={{ width: "100%" }}
              value={severity}
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label="Part ID" required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label="Description" multiline minRows={4} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Submit Issue</Button>
      </DialogActions>
    </Dialog>
  );
}
