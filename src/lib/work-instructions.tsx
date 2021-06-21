import { Quaternion, Vector3 } from "@vertexvis/geometry";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";
import {
  Matrix4x4,
  Quaternion as Math3dQuaternion,
  Vector3 as Math3dVector3,
} from "math3d";

interface Arrow {
  readonly position: Vector3.Vector3;
  readonly rotation: Quaternion.Quaternion;
}

interface Part {
  readonly quantity: number;
  readonly sceneItemSuppliedId: string;
}

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: React.ReactNode[];
  readonly name: string;
  readonly parts: Part[];
  readonly sceneViewStateId: string;
  readonly step: number;
}

export const RimCam: FrameCamera.FrameCamera = {
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

export const LugNutCam: FrameCamera.FrameCamera = {
  ...RimCam,
  position: {
    ...RimCam.position,
    x: -2516.525146484375,
    y: 2417.216064453125,
  },
  lookAt: {
    ...RimCam.lookAt,
    y: 1046.1944580078125,
  },
};

export const Step1Cam: FrameCamera.FrameCamera = {
  position: {
    x: -901.5206298828125,
    y: 660.30810546875,
    z: 396.15740966796875,
  },
  lookAt: {
    x: -1377.415771484375,
    y: 794.2061767578125,
    z: 236.43722534179688,
  },
  up: {
    x: -0.31933844089508057,
    y: -0.0046013714745640755,
    z: 0.9476295113563538,
  },
};

export const SuppliedIdToTransform: { readonly [k: string]: number[] } = {
  109640: toMatrix(-35.4580993652344, -48.80400085449219),
  109650: toMatrix(-57.372501373291016, 18.64150047302246),
  109660: toMatrix(0, 60.32500076293945),
  109670: toMatrix(57.372501373291016, 18.64150047302246),
  109680: toMatrix(35.458099365234375, -48.80400085449219),
};

export const InstructionSteps: Record<string, InstructionStep> = {
  "dbf5540f-56e3-4434-95cb-ae51d8725f06": {
    camera: RimCam,
    instructions: [],
    name: "Rim",
    parts: [{ quantity: 1, sceneItemSuppliedId: "108940" }],
    sceneViewStateId: "dbf5540f-56e3-4434-95cb-ae51d8725f06",
    step: 1,
  },
  "e57ad094-0103-487e-b377-eced7619991e": {
    camera: RimCam,
    instructions: [],
    name: "Tire onto rim",
    parts: [{ quantity: 1, sceneItemSuppliedId: "108950" }],
    sceneViewStateId: "e57ad094-0103-487e-b377-eced7619991e",
    step: 2,
  },
  "58b7c10d-49c6-4baa-8b5e-f2f3d738597b": {
    arrows: [
      {
        position: { x: -1350, y: 1075, z: 200 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
      },
    ],
    camera: LugNutCam,
    instructions: [],
    name: "Lug nuts into rim",
    parts: [{ quantity: 5, sceneItemSuppliedId: "109640" }],
    sceneViewStateId: "58b7c10d-49c6-4baa-8b5e-f2f3d738597b",
    step: 3,
  },
};

function toMatrix(posX: number, posY: number): number[] {
  return Matrix4x4.TRS(
    new Math3dVector3(posX, posY, -350),
    Math3dQuaternion.Euler(-180, 0, -43.58595040792774),
    1
  ).values;
}
