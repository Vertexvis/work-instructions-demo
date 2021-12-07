import Link from "@mui/material/Link";
import { Euler, Vector3 } from "@vertexvis/geometry";
import type { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

import { Credentials } from "./config";

interface Arrow {
  readonly position: Vector3.Vector3;
  readonly rotation: Euler.Euler;
  readonly type: "up" | "down";
}

interface Part {
  readonly name: string;
  readonly quantity: number;
  readonly sceneItemSuppliedIds: string[];
}

export interface WorkInstructions {
  readonly clientId: string;
  readonly completionMins?: number;
  readonly description?: string;
  readonly partCount?: number;
  readonly steps: Record<string, InstructionStep>;
  readonly streamKey: string;
  readonly title?: string;
}

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions:
    | string[]
    | ((onShow: (name: string, ids: string[]) => void) => React.ReactNode[]);
  readonly parts: Part[];
  readonly sceneItemsVisible: string[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
  readonly thumbnailUri: string;
}

const HoweBallJointsName = "Howe ball joint";
const M10x35BoltsName = "M10x35";
const SSSpindleName = "SS Spindle";
const Z06InnerHubName = "Z06 inner hub";

const ControlArmRlls = "308600";
const FenderFrame = "312220";
const FenderRearStreet = "312240";
const HoweBallJoints = ["312200", "312210"];
const M10x35Bolts = ["312100", "312110", "312120", "312130", "312140"];
const M12HeimMhmr12T = "300820";
const SSSpindle = "312230";
const ToeLink = "308640";
const WheelAxle = "308390";
const WheelMechHousing = "307750";
const Z06InnerHub = "312080";

const step2SceneItemsVisible = [
  M12HeimMhmr12T,
  Z06InnerHub,
  ...HoweBallJoints,
  SSSpindle,
  WheelMechHousing,
  WheelAxle,
  ControlArmRlls,
  ToeLink,
];

export const DefaultInstructions: WorkInstructions = {
  ...Credentials,
  completionMins: 5,
  description:
    "At this station, the assembly technician assembles the spindle and installs it on the vehicle.",
  partCount: 15,
  steps: {
    "step-1": {
      arrows: [
        {
          position: { x: -1400, y: 740, z: 225 },
          rotation: { order: "xyz", x: 0, y: 2, z: 0 },
          type: "up",
        },
        {
          position: { x: -1298, y: 740, z: 235 },
          rotation: { order: "xyz", x: 0, y: 2, z: 0 },
          type: "up",
        },
        {
          position: { x: -1340, y: 740, z: 145 },
          rotation: { order: "xyz", x: 0, y: 2, z: 0 },
          type: "up",
        },
      ],
      camera: {
        position: {
          x: -955.79669189453,
          y: 520.90802001953,
          z: 368.5772399902344,
        },
        lookAt: {
          x: -1377.415771484375,
          y: 794.2061767578125,
          z: 236.43722534179688,
        },
        up: {
          x: -0.2708650827407837,
          y: 0.0470057874917984,
          z: 0.9614689350128174,
        },
      },
      instructions: (onShow: (name: string, ids: string[]) => void) => [
        <>
          Install three (3) M12x1.25 mm torx head bolts in the{" "}
          <Link
            onClick={() => onShow(Z06InnerHubName, [Z06InnerHub])}
            sx={{ cursor: "pointer" }}
          >
            {Z06InnerHubName}
          </Link>{" "}
          with Loctite® Threadlocker 271™.
        </>,
        <>Using a T55 socket, torque the bolts to 75 ft/lbs.</>,
      ],
      parts: [
        {
          name: Z06InnerHubName,
          quantity: 1,
          sceneItemSuppliedIds: [Z06InnerHub],
        },
        {
          name: SSSpindleName,
          quantity: 1,
          sceneItemSuppliedIds: [SSSpindle],
        },
      ],
      sceneItemsVisible: [Z06InnerHub, SSSpindle],
      sceneViewStateId: "49679fc2-2b98-4c39-ac21-cf8102dd39cc",
      step: 1,
      title: "Install the inner hub on the spindle",
      thumbnailUri: "/step-1.png",
    },
    "step-2": {
      arrows: [
        {
          position: { x: -1360, y: 685, z: 390 },
          rotation: { order: "xyz", x: 0, y: 2, z: 0.05 },
          type: "up",
        },
        {
          position: { x: -1334, y: 730, z: 130 },
          rotation: { order: "xyz", x: 0, y: 2, z: 0 },
          type: "up",
        },
      ],
      camera: {
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
      },
      instructions: (onShow: (name: string, ids: string[]) => void) => [
        <>
          Clean the ID of the{" "}
          <Link
            onClick={() => onShow(SSSpindleName, [SSSpindle])}
            sx={{ cursor: "pointer" }}
          >
            spindle
          </Link>{" "}
          and the OD of the{" "}
          <Link
            onClick={() => onShow(HoweBallJointsName, HoweBallJoints)}
            sx={{ cursor: "pointer" }}
          >
            ball joints
          </Link>{" "}
          with brake cleaner and degreaser.
        </>,
        <>Wipe clean with a lint free shop towel.</>,
        <>
          Install the washers and castle nuts on the{" "}
          <Link
            onClick={() => onShow(HoweBallJointsName, HoweBallJoints)}
            sx={{ cursor: "pointer" }}
          >
            ball joints
          </Link>
          .
        </>,
        <>
          Torque the castle nuts to 30 ft/lbs and turn it an additional 140°.
        </>,
        <>
          Ensure the castle nut notch lines up with the hole in the{" "}
          <Link
            onClick={() => onShow(HoweBallJointsName, HoweBallJoints)}
            sx={{ cursor: "pointer" }}
          >
            ball joints
          </Link>{" "}
          and install a cotter pin.
        </>,
      ],
      parts: [
        {
          name: Z06InnerHubName,
          quantity: 1,
          sceneItemSuppliedIds: [Z06InnerHub],
        },
        {
          name: HoweBallJointsName,
          quantity: 2,
          sceneItemSuppliedIds: HoweBallJoints,
        },
        { name: SSSpindleName, quantity: 1, sceneItemSuppliedIds: [SSSpindle] },
      ],
      sceneItemsVisible: step2SceneItemsVisible,
      sceneViewStateId: "e146181e-2809-42b9-87f1-24d2bd25bef2",
      step: 2,
      title: "Install the spindle on the ball joints",
      thumbnailUri: "/step-2.png",
    },
    "step-3": {
      arrows: [
        {
          position: { x: -1490, y: 860, z: 185 },
          rotation: { order: "xyz", x: -0.2, y: 1, z: 0.2 },
          type: "down",
        },
      ],
      camera: {
        position: {
          x: -1723.2679443359375,
          y: 1058.5960693359375,
          z: 279.37823486328125,
        },
        lookAt: {
          x: -1388.18310546875,
          y: 770.7772827148438,
          z: 223.43975830078125,
        },
        up: {
          x: 0.12238356471061707,
          y: -0.05016382411122322,
          z: 0.9912142753601074,
        },
      },
      instructions: () => [],
      parts: [
        {
          name: "M12 heim MHMR12T",
          quantity: 1,
          sceneItemSuppliedIds: [M12HeimMhmr12T],
        },
        { name: "Toe Link", quantity: 1, sceneItemSuppliedIds: [ToeLink] },
      ],
      sceneItemsVisible: step2SceneItemsVisible,
      sceneViewStateId: "7006b7ba-1ec7-49aa-aefe-fe77698da65b",
      step: 3,
      title: "Install the stabilizer arm",
      thumbnailUri: "/step-3.png",
    },
    "step-4": {
      arrows: [
        {
          position: { x: -1459, y: 650, z: 320 },
          rotation: { order: "xyz", x: 0, y: -1, z: 0 },
          type: "up",
        },
      ],
      camera: {
        position: {
          x: -1329.5069580078125,
          y: 561.3935546875,
          z: 451.5056457519531,
        },
        lookAt: {
          x: -1398.9622802734375,
          y: 714.4110717773438,
          z: 303.1302795410156,
        },
        up: {
          x: -0.7405996918678284,
          y: 0.2632957994937897,
          z: 0.6182129979133606,
        },
      },
      instructions: (onShow: (name: string, ids: string[]) => void) => [
        <>
          Torque the{" "}
          <Link
            onClick={() => onShow(M10x35BoltsName, M10x35Bolts)}
            sx={{ cursor: "pointer" }}
          >
            {M10x35BoltsName} bolts
          </Link>{" "}
          to 45 ft/lbs.
        </>,
      ],
      parts: [
        {
          name: M10x35BoltsName,
          quantity: 5,
          sceneItemSuppliedIds: M10x35Bolts,
        },
        {
          name: "Fender frame",
          quantity: 1,
          sceneItemSuppliedIds: [FenderFrame],
        },
        {
          name: "Fender rear",
          quantity: 1,
          sceneItemSuppliedIds: [FenderRearStreet],
        },
      ],
      sceneItemsVisible: [
        ...step2SceneItemsVisible,
        ...M10x35Bolts,
        FenderFrame,
        FenderRearStreet,
      ],
      sceneViewStateId: "6420d920-9166-4355-91d0-23139298472b",
      step: 4,
      title: "Install the fender frame",
      thumbnailUri: "/step-4.png",
    },
  },
  title: "Spindle Install",
};
