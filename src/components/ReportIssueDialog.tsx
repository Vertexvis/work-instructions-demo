import { Stations } from '@components/Stations';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly onConfirm: () => void;
	readonly partName?: string;
}

export function ReportIssueDialog({
	open,
	onClose,
	onConfirm,
	partName,
}: Props): JSX.Element {
	const [issueType, setIssueType] = React.useState(1);
	const [severity, setSeverity] = React.useState(2);
	const { register, handleSubmit } = useForm();

	return (
		<Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
			<DialogTitle>Report an Issue</DialogTitle>
			<form
				onSubmit={() => {
					handleSubmit(onConfirm);
				}}
			>
				<DialogContent sx={{ pt: 0 }}>
					<Grid container spacing={3} sx={{ mt: 0 }}>
						<Grid size={{ xs: 12, sm: 8 }}>
							<TextField
								fullWidth
								label="Title"
								required
								size="small"
								{...register('title', { required: true })}
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Select
								onChange={(e) => setIssueType(e.target.value as number)}
								size="small"
								sx={{ width: '100%' }}
								value={issueType}
							>
								<MenuItem value={1}>Bug</MenuItem>
								<MenuItem value={2}>Feature</MenuItem>
							</Select>
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Stations sx={{ width: '100%' }} />
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<TextField fullWidth label="Location" size="small" />
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Select
								onChange={(e) => setSeverity(e.target.value as number)}
								size="small"
								sx={{ width: '100%' }}
								value={severity}
							>
								<MenuItem value={1}>Low</MenuItem>
								<MenuItem value={2}>Medium</MenuItem>
								<MenuItem value={3}>High</MenuItem>
							</Select>
						</Grid>
						<Grid size={{ xs: 12, sm: 12 }}>
							<TextField
								defaultValue={partName}
								fullWidth
								label="Part Identifier"
								required
								size="small"
								{...register('part-id', { required: true })}
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 12 }}>
							<TextField
								fullWidth
								label="Description"
								multiline
								minRows={4}
								size="small"
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color="inherit" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Submit Issue</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
