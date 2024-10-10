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
import React, { useEffect, useState } from 'react';

import { useViewerContext } from '../contexts/viewer-context';

export function Home({ vertexEnv }: Configuration): JSX.Element {
	const viewer = useViewer();

	const {
		streamKey,
		setStreamKey,
		setSelectedInstructionStep,
		setWorkInstructions,
	} = useViewerContext();

	const [activeStep, setActiveStep] = useState<{
		num: number;
	}>({ num: -1 });

	const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false);
	const [ghosted, setGhosted] = useState(false);
	const [isInitialView, setIsInitialView] = useState(true);
	const [isSceneReady, setIsSceneReady] = useState(false);

	const [rightDrawerContent, setRightDrawerContent] = useState<
		Content | undefined
	>('instructions');
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	const instructions: WorkInstructions = DefaultInstructions;

	useEffect(() => {
		setStreamKey(instructions.streamKey);
		setWorkInstructions(instructions);
	});

	if (streamKey == null) return <></>;

	async function handleSceneReady() {
		const v = viewer.ref.current;
		if (v == null) return;

		const scene = await v.scene();
		if (scene == null) return;

		setIsSceneReady(true);
	}

	async function onInstructionStepSelected(num: number): Promise<void> {
		if (!isSceneReady) return;
		const step = instructions.steps[Object.keys(instructions.steps)[num]];
		setIsSceneReady(false);

		const res = await flyTo({
			camera: step?.camera,
			viewer: viewer.ref.current,
		});

		return res
			? res.onAnimationCompleted.on(() => onComplete(num, step))
			: onComplete(num, step);
	}

	async function handleBeginAssembly() {
		handleInitialView();
		await onInstructionStepSelected(0);
	}

	function onComplete(num: number, step: InstructionStep): void {
		handleInitialView();
		setActiveStep({ num });
		setSelectedInstructionStep(step);
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
					onSelect={(num: number) => {
						void onInstructionStepSelected(num);
					}}
					ready={isSceneReady}
					viewer={viewer.ref}
				/>
			}
			bottomDrawerHeight={BottomDrawerHeight}
			main={
				viewer.isReady && (
					<Viewer
						configEnv={vertexEnv}
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
						viewer={viewer.ref}
						phantom={{ opacity: 0.7 }}
					/>
				)
			}
			rightDrawer={
				<RightDrawer
					content={rightDrawerContent}
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
