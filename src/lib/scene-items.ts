import { vertexvis } from '@vertexvis/frame-streaming-protos';
import { Components, TapEventDetails } from '@vertexvis/viewer';
import type { CameraRenderResult } from '@vertexvis/viewer/dist/types/lib/scenes/cameraRenderResult';
import type { FrameCamera } from '@vertexvis/viewer/dist/types/lib/types';

export const AnimationDurationMs = 500;

interface Req {
	readonly viewer: Components.VertexViewer | null;
}

interface FlyToReq extends Req {
	readonly camera?: FrameCamera.FrameCamera;
}

interface HandleHitReq extends Req {
	readonly detail: TapEventDetails;
	readonly hit?: vertexvis.protobuf.stream.IHit;
}

interface SelectBySuppliedIdsReq extends Req {
	ids: string[];
}

export async function flyTo({
	camera,
	viewer,
}: FlyToReq): Promise<CameraRenderResult | undefined> {
	if (viewer == null || camera == null) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	const sc = scene.camera();
	if (
		JSON.stringify({
			position: sc.position,
			lookAt: sc.lookAt,
			up: sc.up,
		}) === JSON.stringify(camera)
	) {
		return;
	}

	return scene
		.camera()
		.flyTo({ camera })
		.render({ animation: { milliseconds: AnimationDurationMs } });
}

export async function handleHit({
	detail,
	hit,
	viewer,
}: HandleHitReq): Promise<void> {
	if (!viewer) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	const id = hit?.itemId?.hex;
	if (detail.buttons === 1) {
		if (id) {
			await scene
				.items((op) => {
					const idQuery = op.where((q) => q.withItemId(id));
					return [op.where((q) => q.all()).deselect(), idQuery.select()];
				})
				.execute();
		} else {
			await scene.items((op) => op.where((q) => q.all()).deselect()).execute();
		}
	}
}

export async function selectBySuppliedIds({
	ids,
	viewer,
}: SelectBySuppliedIdsReq): Promise<void> {
	if (viewer == null || !ids || ids.length === 0) return;

	const scene = await viewer.scene();
	if (scene == null) return;

	await scene
		.items((op) => {
			return [
				op.where((q) => q.all()).deselect(),
				op.where((q) => q.withSuppliedIds(ids)).select(),
			];
		})
		.execute();
}
