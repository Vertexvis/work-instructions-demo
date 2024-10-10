import { BottomDrawerHeight } from '@components/Layout';
import { resetScene } from '@lib/viewer-actions';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Refresh from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useViewerContext } from '../contexts/viewer-context';

interface Props {
	readonly activeStep: number;
	readonly onSelect: (activeStep: number) => void;
	readonly ready: boolean;
	readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

const BtnMargin = 5;

const Drawer = styled(MuiDrawer)(() => ({
	[`& .${drawerClasses.paper}`]: { height: BottomDrawerHeight },
}));

export function BottomDrawer({
	activeStep,
	onSelect,
	ready,
	viewer,
}: Props): JSX.Element {
	const { workInstructions } = useViewerContext();

	if (workInstructions == null) return <></>;

	const stepIds =
		workInstructions.steps != null ? Object.keys(workInstructions.steps) : [];

	function PrevBtn() {
		return (
			<Fab
				disabled={!ready || activeStep === -1 || activeStep === 0}
				sx={{ mx: BtnMargin }}
				onClick={() => onSelect(activeStep - 1)}
			>
				<ChevronLeft />
			</Fab>
		);
	}

	function NextBtn() {
		return (
			<Fab
				disabled={!ready}
				sx={{ mx: BtnMargin }}
				onClick={() => onSelect(activeStep + 1)}
			>
				<ChevronRight />
			</Fab>
		);
	}

	function DoneBtn() {
		return (
			<Fab
				color={'primary'}
				disabled={!ready || activeStep >= stepIds.length}
				sx={{ mr: BtnMargin }}
				onClick={() => onSelect(activeStep + 1)}
			>
				<Check />
			</Fab>
		);
	}

	function ResetBtn() {
		return (
			<Fab
				disabled={!ready}
				sx={{ mx: BtnMargin }}
				onClick={() => {
					onSelect(-1);
					void resetScene(viewer);
				}}
			>
				<Refresh />
			</Fab>
		);
	}

	function Steps() {
		if (workInstructions == null) return <></>;

		return (
			<Stepper activeStep={activeStep} alternativeLabel sx={{ flexGrow: 1 }}>
				{Object.keys(workInstructions.steps).map((k) => {
					const s = workInstructions.steps[k];
					return (
						<Step key={k}>
							<StepButton disabled={false} onClick={() => onSelect(s.step - 1)}>
								<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										height={120}
										key={k}
										src={s.thumbnailUri}
										alt={`Step ${s.step}`}
									/>
								</Box>
							</StepButton>
						</Step>
					);
				})}
			</Stepper>
		);
	}

	function getRightBtn() {
		return activeStep >= stepIds.length - 1 ? (
			<Box sx={{ alignItems: 'center', display: 'flex' }}>
				<ResetBtn />
				<DoneBtn />
			</Box>
		) : (
			<NextBtn />
		);
	}

	const minWidth = 232;
	return (
		<Drawer anchor="bottom" variant="permanent">
			<Box sx={{ alignItems: 'center', display: 'flex', mt: 2 }}>
				<Box sx={{ minWidth: minWidth / 2 }}>
					<PrevBtn />
				</Box>
				<Steps />
				<Box sx={{ display: 'flex', minWidth }}>{getRightBtn()}</Box>
			</Box>
		</Drawer>
	);
}
