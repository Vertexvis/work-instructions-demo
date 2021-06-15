import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { ColorMaterial, Components, TapEventDetails } from "@vertexvis/viewer";
import { CameraRenderResult } from "@vertexvis/viewer/dist/types/lib/scenes/cameraRenderResult";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

const SelectColor = {
  ...ColorMaterial.create(255, 255, 0),
  glossiness: 4,
  specular: { r: 255, g: 255, b: 255, a: 0 },
};

const ActivePartColor = {
  ...SelectColor,
  ...ColorMaterial.fromHex("F59E0B"),
};

interface Req {
  readonly viewer: Components.VertexViewer | null;
}

interface FlyToReq extends Req {
  readonly camera: FrameCamera.FrameCamera;
}

interface LoadSceneViewStateReq extends Req {
  readonly id?: string;
}

interface SelectByHitReq extends Req {
  readonly detail: TapEventDetails;
  readonly hit?: vertexvis.protobuf.stream.IHit;
}

interface Arrow {
  position: { x: number; y: number; z: number };
  rotation: { w: number; x: number; y: number; z: number };
}

export interface SceneViewState {
  readonly id: string;
  readonly camera: FrameCamera.FrameCamera;
  readonly name: string;
  readonly step: number;
  readonly arrows?: Arrow[];
}

const RimCam = {
  position: {
    x: -1345.920166015625,
    y: 2363.62158203125,
    z: 199.25672912597656,
  },
  lookAt: {
    x: -1345.920166015625,
    y: 827.1365966796875,
    z: 199.25672912597656,
  },
  up: {
    x: 0.0,
    y: 0.0,
    z: 1.0,
  },
};

const LugNutCam = {
  ...RimCam,
  position: {
    ...RimCam.position,
    x: -2516.525146484375,
    y: 2417.216064453125,
    // x: -2619.583984375,
    // y: 2318.86181640625,
  },
  lookAt: {
    ...RimCam.lookAt,
    y: 1046.1944580078125,
  },
};

export const SceneViewStates: Record<string, SceneViewState> = {
  "dbf5540f-56e3-4434-95cb-ae51d8725f06": {
    id: "dbf5540f-56e3-4434-95cb-ae51d8725f06",
    camera: RimCam,
    name: "Rim",
    step: 1,
  },
  "e57ad094-0103-487e-b377-eced7619991e": {
    id: "e57ad094-0103-487e-b377-eced7619991e",
    camera: RimCam,
    name: "Tire onto rim",
    step: 2,
  },
  "58b7c10d-49c6-4baa-8b5e-f2f3d738597b": {
    id: "58b7c10d-49c6-4baa-8b5e-f2f3d738597b",
    camera: LugNutCam,
    name: "Lug nuts into rim",
    step: 3,
    arrows: [
      {
        position: { x: -1350, y: 1075, z: 200 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
      },
    ],
  },
};

export async function flyTo({
  camera,
  viewer,
}: FlyToReq): Promise<CameraRenderResult | undefined> {
  if (viewer == null) return;

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
    .render({ animation: { milliseconds: 500 } });
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

export async function selectByHit({
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

import { Matrix4x4, Quaternion, Vector3 as Math3dVector3 } from "math3d";

const suppliedIdToTransform: { [k: string]: number[] } = {
  109640: toMatrix(-35.4580993652344, -48.80400085449219),
  109650: toMatrix(-57.372501373291016, 18.64150047302246),
  109660: toMatrix(0, 60.32500076293945),
  109670: toMatrix(57.372501373291016, 18.64150047302246),
  109680: toMatrix(35.458099365234375, -48.80400085449219),
};

export async function initialize({ viewer }: Req): Promise<void> {
  if (viewer == null) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  await scene
    .camera()
    .flyTo({ camera: LugNutCam })
    .render({ animation: { milliseconds: 500 } });

  await scene
    .items((op) => {
      const idsQuery = op.where((q) =>
        q.withSuppliedIds([
          "108940", // 12x20 OZ HLT ET 3 SPOKE
          "108950", // michelin sport cup 2 345-30zr20 on rim_(Default)
        ])
      );
      return [
        ...Object.keys(suppliedIdToTransform).map((k) =>
          op
            .where((q) => q.withSuppliedId(k))
            .show()
            .transform(suppliedIdToTransform[k])
            .materialOverride(ActivePartColor)
        ),
        op.where((q) => q.all()).hide(),
        idsQuery.show(),
        // op
        //   .where((q) => q.withSuppliedId("108940"))
        //   .materialOverride(ActivePartColor),
      ];
    })
    .execute();
}

export function toMatrix(posX: number, posY: number): number[] {
  return Matrix4x4.TRS(
    new Math3dVector3(posX, posY, -350),
    Quaternion.Euler(-180, 0, -43.58595040792774),
    1
  ).values;
}
