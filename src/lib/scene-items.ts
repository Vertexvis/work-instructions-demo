import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { ColorMaterial, Components, TapEventDetails } from "@vertexvis/viewer";
import { CameraRenderResult } from "@vertexvis/viewer/dist/types/lib/scenes/cameraRenderResult";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

export const AnimationDurationMs = 500;

export const SelectColor = {
  ...ColorMaterial.create(255, 255, 0),
  glossiness: 4,
  specular: { r: 255, g: 255, b: 255, a: 0 },
};

interface Req {
  readonly viewer: Components.VertexViewer | null;
}

interface FlyToReq extends Req {
  readonly camera?: FrameCamera.FrameCamera;
}

interface LoadSceneViewStateReq extends Req {
  readonly id?: string;
}

interface SelectByHitReq extends Req {
  readonly detail: TapEventDetails;
  readonly hit?: vertexvis.protobuf.stream.IHit;
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

export async function loadSceneViewState({
  id,
  viewer,
}: LoadSceneViewStateReq): Promise<void> {
  if (viewer == null || !id) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  await scene.applySceneViewState(id);
}

export async function handleHit({
  detail,
  hit,
  viewer,
}: SelectByHitReq): Promise<void> {
  if (viewer == null) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  const id = hit?.itemId?.hex;
  if (id) {
    await scene
      .items((op) => {
        const idQuery = op.where((q) => q.withItemId(id));
        return [
          op.where((q) => q.all()).deselect(),
          // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#return_value
          detail.buttons === 2 ? idQuery.hide() : idQuery.select(SelectColor),
        ];
      })
      .execute();
  } else {
    await scene.items((op) => op.where((q) => q.all()).deselect()).execute();
  }
}
