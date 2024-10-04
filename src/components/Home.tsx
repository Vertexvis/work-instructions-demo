import { BottomDrawer } from '@components/BottomDrawer';
import {
	BottomDrawerHeight,
	Layout,
	RightDrawerWidth,
} from '@components/Layout';
import { ReportIssueDialog } from '@components/ReportIssueDialog';
import { Content, RightDrawer } from '@components/RightDrawer';
import { Viewer } from '@components/Viewer';
import { Configuration } from '@lib/config';
import {
	flyTo,
	handleHit as onSelect,
	selectBySuppliedIds,
} from '@lib/scene-items';
import { useViewer } from '@lib/viewer';
import {
	DefaultInstructions,
	InstructionStep,
	WorkInstructions,
} from '@lib/work-instructions';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

export function Home({ vertexEnv }: Configuration): JSX.Element {
	const viewer = useViewer();

	const [activeStep, setActiveStep] = React.useState<{
		num: number;
		step: InstructionStep | undefined;
	}>({ num: -1, step: undefined });

	const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] =
		React.useState(false);
	const [ghosted, setGhosted] = React.useState(false);
	const [isInitialView, setIsInitialView] = React.useState(true);
	const [isSceneReady, setIsSceneReady] = React.useState(false);
	const [rightDrawerContent, setRightDrawerContent] = React.useState<
		Content | undefined
	>('instructions');
	const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

	const instructions: WorkInstructions = DefaultInstructions;

	async function handleSceneReady() {
		const v = viewer.ref.current;
		if (v == null) return;

		const scene = await v.scene();
		if (scene == null) return;

		setIsSceneReady(true);
	}

	async function onInstructionStepSelected(num: number): Promise<void> {
		console.log('onInstructionStepSelected');

		if (!isSceneReady) return;
		const step = instructions.steps[Object.keys(instructions.steps)[num]];
		setIsSceneReady(false);

		const res = await flyTo({
			camera: step?.camera,
			viewer: viewer.ref.current,
		});

		if (res) {
			res.onAnimationCompleted.on(() => onComplete(num, step));
			return;
		}

		onComplete(num, step);
	}

	async function handleBeginAssembly() {
		handleInitialView();
		await onInstructionStepSelected(0);
	}

	function onComplete(num: number, step: InstructionStep): void {
		handleInitialView();
		setActiveStep({ num, step });
		setIsSceneReady(true);
	}

	function handleInitialView() {
		if (isInitialView) {
			setIsInitialView(false);
		}
	}

	return (
		<Layout
			bottomDrawer={
				<BottomDrawer
					activeStep={activeStep.num}
					instructions={instructions}
					onSelect={(num: number) => {
						void onInstructionStepSelected(num);
					}}
					ready={isSceneReady}
				/>
			}
			bottomDrawerHeight={BottomDrawerHeight}
			main={
				viewer.isReady && (
					<Viewer
						configEnv={vertexEnv}
						experimentalGhostingOpacity={ghosted ? 0.7 : 0}
						instructionStep={activeStep.step}
						onClick={(button) => {
							if (
								button === 'settings' ||
								button === 'instructions' ||
								button === 'parts'
							) {
								setRightDrawerContent(button);
							} else if (button === 'issue') {
								setIsReportIssueDialogOpen(true);
							}
						}}
						onSceneReady={() => {
							void handleSceneReady();
						}}
						onSelect={async (detail, hit) => {
							await onSelect({ detail, hit, viewer: viewer.ref.current });
						}}
						streamKey={instructions.streamKey}
						viewer={viewer.ref}
						phantom={{ opacity: 0.7 }}
					/>
				)
			}
			rightDrawer={
				<RightDrawer
					content={rightDrawerContent}
					instructions={instructions}
					instructionStep={activeStep.step}
					onBeginAssembly={() => {
						void handleBeginAssembly();
					}}
					onClose={() => setRightDrawerContent(undefined)}
					open={rightDrawerContent != null}
					onShow={(_name, ids) => {
						void selectBySuppliedIds({ ids, viewer: viewer.ref.current });
					}}
					settings={{
						ghosted,
						onGhostToggle: setGhosted,
						onIsInitialView: setIsInitialView,
					}}
				/>
			}
			rightDrawerWidth={rightDrawerContent != null ? RightDrawerWidth : 0}
		>
			{isReportIssueDialogOpen && (
				<ReportIssueDialog
					onClose={() => setIsReportIssueDialogOpen(false)}
					onConfirm={() => {
						setIsSnackbarOpen(true);
						setIsReportIssueDialogOpen(false);
					}}
					open={isReportIssueDialogOpen}
					partName="none" // TODO {selectedPartName}
				/>
			)}
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={6000}
				onClose={(_e, reason) => {
					if (reason === 'clickaway') return;

					setIsSnackbarOpen(false);
				}}
				message="Issue reported successfully."
			/>
		</Layout>
	);
}
