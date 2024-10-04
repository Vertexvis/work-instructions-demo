import { BottomDrawer } from '@components/BottomDrawer';
import { Header } from '@components/Header';
import {
	BottomDrawerHeight,
	Layout,
	RightDrawerWidth,
} from '@components/Layout';
import { ReportIssueDialog } from '@components/ReportIssueDialog';
import { Content, RightDrawer } from '@components/RightDrawer';
import { Viewer } from '@components/Viewer';
import {
	createSceneViewState,
	initializeScene,
	renderPartRevision,
	RenderPartRevisionReq,
} from '@lib/authoring';
import { Configuration } from '@lib/config';
import {
	flyTo,
	handleHit as onSelect,
	selectBySuppliedIds,
} from '@lib/scene-items';
import { head } from '@lib/utils';
import { useViewer } from '@lib/viewer';
import {
	DefaultInstructions,
	InstructionStep,
	WorkInstructions,
} from '@lib/work-instructions';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';
import React from 'react';

export function Home({ authoring, vertexEnv }: Configuration): JSX.Element {
	const router = useRouter();
	const viewer = useViewer();

	const [activeStep, setActiveStep] = React.useState<{
		num: number;
		step: InstructionStep | undefined;
	}>({ num: -1, step: undefined });
	const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
		undefined,
	);
	const [ready, setReady] = React.useState(false);
	const [rightDrawerContent, setRightDrawerContent] = React.useState<
		Content | undefined
	>('instructions');
	const [ghosted, setGhosted] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [snackOpen, setSnackOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<RenderPartRevisionReq>({});
	const [partName, setPartName] = React.useState<string | undefined>();
	const [instructions, setInstructions] =
		React.useState<WorkInstructions>(DefaultInstructions);
	const [isInitialView, setIsInitialView] = React.useState(true);
	React.useEffect(() => {
		if (!router.isReady) return;

		const inst = head(router.query.instructions);

		if (inst == null) return;

		try {
			const parsed: WorkInstructions = JSON.parse(
				Buffer.from(inst, 'base64').toString('utf8'),
			) as WorkInstructions;

			if (
				parsed.clientId == null ||
				parsed.streamKey == null ||
				parsed.steps == null ||
				Object.keys(parsed.steps).length === 0
			) {
				return;
			}

			setInstructions(parsed);
		} catch (e: unknown) {
			console.error('Invalid instructions.', { data: e });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	React.useEffect(() => {
		setPartName(selected?.part?.name);
	}, [selected]);

	async function handleSceneReady() {
		const v = viewer.ref.current;
		if (v == null) return;

		const scene = await v.scene();
		if (scene == null) return;

		setReady(true);
		setSceneViewId(scene.sceneViewId);
		if (authoring) await initializeScene({ instructions, viewer: v });
	}

	async function onInstructionStepSelected(num: number): Promise<void> {
		if (!ready) return;
		const step = instructions.steps[Object.keys(instructions.steps)[num]];
		setReady(false);
		function onComplete() {
			handleInitialView();
			setActiveStep({ num, step });
			setReady(true);
		}

		const res = await flyTo({
			camera: step?.camera,
			viewer: viewer.ref.current,
		});

		if (res) {
			res.onAnimationCompleted.on(onComplete);
			return;
		}

		onComplete();
	}

	async function handleBeginAssembly() {
		handleInitialView();
		await onInstructionStepSelected(0);
	}

	function handleInitialView() {
		if (isInitialView) {
			setGhosted(true);
			setIsInitialView(false);
		}
	}
	return router.isReady ? (
		<Layout
			bottomDrawer={
				<BottomDrawer
					activeStep={activeStep.num}
					instructions={instructions}
					onSelect={(num: number) => {
						void onInstructionStepSelected(num);
					}}
					ready={ready}
				/>
			}
			bottomDrawerHeight={BottomDrawerHeight}
			header={
				authoring && (
					<Header
						onCreateSceneViewState={(name) => {
							void createSceneViewState({ name, sceneViewId });
						}}
						onRenderPartRevision={() => {
							void renderPartRevision(selected);
						}}
					/>
				)
			}
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
								setDialogOpen(true);
							}
						}}
						onSceneReady={() => {
							void handleSceneReady();
						}}
						onSelect={async (detail, hit) => {
							console.debug({
								hitNormal: hit?.hitNormal,
								hitPoint: hit?.hitPoint,
								partName:
									hit?.metadataProperties?.find(
										(p) => p.key && p.key === 'Name',
									)?.asString ?? undefined,
								sceneItemId: hit?.itemId?.hex,
								sceneItemSuppliedId: hit?.itemSuppliedId?.value,
							});
							setSelected({
								part: {
									name:
										hit?.metadataProperties?.find(
											(p) => p.key && p.key === 'Name',
										)?.asString ?? undefined,
									revisionId: hit?.partRevisionId?.hex ?? undefined,
								},
								sceneItemSuppliedId: hit?.itemSuppliedId?.value ?? undefined,
							});
							await onSelect({ detail, hit, viewer: viewer.ref.current });
						}}
						streamKey={instructions.streamKey}
						viewer={viewer.ref}
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
					onShow={(name, ids) => {
						setPartName(name);
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
			{dialogOpen && (
				<ReportIssueDialog
					onClose={() => setDialogOpen(false)}
					onConfirm={() => {
						setSnackOpen(true);
						setDialogOpen(false);
					}}
					open={dialogOpen}
					partName={partName}
				/>
			)}
			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={(_e, reason) => {
					if (reason === 'clickaway') return;

					setSnackOpen(false);
				}}
				message="Issue reported successfully."
			/>
		</Layout>
	) : (
		<></>
	);
}
