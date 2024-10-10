import { AnimationDurationMs } from '@components/Viewer';

export async function fitAll(
	viewer: React.MutableRefObject<HTMLVertexViewerElement | null>,
	animationDurationMs: number = AnimationDurationMs,
): Promise<void> {
	const scene = await viewer.current?.scene();
	await scene
		?.camera()
		.viewAll()
		.render({ animation: { milliseconds: animationDurationMs } });
}

export async function resetScene(
	viewer: React.MutableRefObject<HTMLVertexViewerElement | null>,
): Promise<void> {
	const scene = await viewer.current?.scene();
	await scene?.reset({ includeCamera: true });
}
