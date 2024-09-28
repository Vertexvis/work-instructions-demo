import { ContentHeader } from '@components/ContentHeader';
import MapOutlined from '@mui/icons-material/MapOutlined';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useViewerContext } from '../contexts/viewer-context';

interface Props {
	readonly onBeginAssembly: () => void;
	readonly onClose: () => void;
	readonly onShow: (name: string, ids: string[]) => void;
}

export function Instructions({
	onBeginAssembly,
	onClose,
	onShow,
}: Props): JSX.Element {
	const { selectedInstructionStep, workInstructions } = useViewerContext();
	const numSteps = Object.keys(workInstructions?.steps ?? 0).length;

	console.log({ instructions: JSON.stringify(workInstructions) });

	function NoContent(): JSX.Element {
		if (!workInstructions) return <></>;
		return selectedInstructionStep == null ? (
			<>
				<ContentHeader
					onClose={onClose}
					title={workInstructions.title ?? 'Work Instructions'}
				/>
				{workInstructions.description && (
					<Typography sx={{ mb: 6 }}>{workInstructions.description}</Typography>
				)}
				{workInstructions.partCount != null && (
					<Box sx={{ display: 'flex', mb: 2 }}>
						<WidgetsOutlined sx={{ mr: 1 }} />
						<Typography>{workInstructions.partCount} parts</Typography>
					</Box>
				)}
				{workInstructions.completionMins != null && (
					<Box sx={{ display: 'flex', mb: 2 }}>
						<TimerOutlined sx={{ mr: 1 }} />
						<Typography>
							{workInstructions.completionMins} minutes to complete
						</Typography>
					</Box>
				)}
				<Box sx={{ display: 'flex', mb: 6 }}>
					<MapOutlined sx={{ mr: 1 }} />
					<Typography>{`${numSteps} steps`}</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={() => onBeginAssembly()} variant="contained">
						Begin Assembly
					</Button>
				</Box>
			</>
		) : (
			<></>
		);
	}

	const stepNum = selectedInstructionStep?.step
		? `Step ${selectedInstructionStep.step} `
		: '';

	return selectedInstructionStep == null ? (
		<NoContent />
	) : (
		<>
			<ContentHeader onClose={onClose} title={`${stepNum} of ${numSteps}`} />
			{selectedInstructionStep.title && (
				<Typography sx={{ fontWeight: 'fontWeightBold', mb: 3 }}>
					{selectedInstructionStep?.title}
				</Typography>
			)}
			{selectedInstructionStep.instructions != null ? (
				typeof selectedInstructionStep.instructions === 'function' ? (
					<List>
						{selectedInstructionStep.instructions(onShow).map((t, i) => (
							<InstructionContent content={t} key={i} index={i} />
						))}
					</List>
				) : (
					<List>
						{selectedInstructionStep.instructions.map((t, i) => (
							<InstructionContent content={t} key={i} index={i} />
						))}
					</List>
				)
			) : (
				<NoContent />
			)}
		</>
	);
}

interface InstructionContentProps {
	content: string | React.ReactNode;
	index: number;
}

function InstructionContent({
	content,
	index,
}: InstructionContentProps): JSX.Element {
	return (
		<Typography key={index} sx={{ mb: 2 }}>
			{`${index + 1}. `}
			{content}
		</Typography>
	);
}
