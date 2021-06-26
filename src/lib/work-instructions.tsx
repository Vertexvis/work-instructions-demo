import { Link } from "@material-ui/core";
import { Quaternion, Vector3 } from "@vertexvis/geometry";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

interface Arrow {
  readonly position: Vector3.Vector3;
  readonly rotation: Quaternion.Quaternion;
  readonly type: "up" | "down";
}

interface Part {
  readonly name: string;
  readonly quantity: number;
  readonly sceneItemSuppliedIds: string[];
}

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: (onShow: (ids: string[]) => void) => React.ReactNode[];
  readonly parts: Part[];
  readonly sceneItemsVisible: string[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}

const step1Cam: FrameCamera.FrameCamera = {
  position: {
    x: -955.7966918945312,
    y: 520.9080200195312,
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
};

const step2Cam: FrameCamera.FrameCamera = {
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

const step3Cam: FrameCamera.FrameCamera = {
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
};

const step4Cam: FrameCamera.FrameCamera = {
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
};

const step2SceneItemsVisible = [
  "100820",
  "109570",
  "109690",
  "109700",
  "109720",
  "110850", // Wheel mech housing
  "111490", // Wheel axle
  "111700", // Control Arm RLLS
  "111740",
];

export const InstructionSteps: Record<string, InstructionStep> = {
  "step-1": {
    arrows: [
      {
        position: { x: -1400, y: 740, z: 221 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
      {
        position: { x: -1298, y: 740, z: 229 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
      {
        position: { x: -1340, y: 740, z: 138 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "up",
      },
    ],
    camera: step1Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Install three (3) M12x1.25 mm torx head bolts in the{" "}
        <Link onClick={() => onShow(["109570"])}>Z06 inner hub</Link> with
        Loctite® Threadlocker 271™.
      </>,
      <>Using a T55 socket, torque the bolts to 75 ft/lbs.</>,
    ],
    parts: [
      { name: "Z06 inner hub", quantity: 1, sceneItemSuppliedIds: ["109570"] },
      {
        name: "SS Spindle",
        quantity: 1,
        sceneItemSuppliedIds: ["109720"],
      },
    ],
    sceneItemsVisible: ["109570", "109720"],
    sceneViewStateId: "557f926a-4f46-4de6-a027-08a2bf789162",
    step: 1,
    title: "Install the inner hub on the spindle",
  },
  "step-2": {
    arrows: [
      {
        position: { x: -1360, y: 685, z: 390 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0.05 },
        type: "up",
      },
      {
        position: { x: -1334, y: 730, z: 130 },
        rotation: { w: 0.7071, x: 0, y: 0.8, z: 0 },
        type: "up",
      },
    ],
    camera: step2Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Clean the ID of the{" "}
        <Link onClick={() => onShow(["109720"])}>spindle</Link> and the OD of
        the{" "}
        <Link onClick={() => onShow(["109690", "109700"])}>ball joints</Link>{" "}
        with brake cleaner and degreaser.
      </>,
      <>Wipe clean with a lint free shop towel.</>,
      <>
        Install the washers and castle nuts on the{" "}
        <Link onClick={() => onShow(["109690", "109700"])}>ball joints</Link>.
      </>,
      <>Torque the castle nuts to 30 ft/lbs and turn it an additional 140°.</>,
      <>
        Ensure the castle nut notch lines up with the hole in the{" "}
        <Link onClick={() => onShow(["109690", "109700"])}>ball joints</Link>{" "}
        and install a cotter pin.
      </>,
    ],
    parts: [
      { name: "Z06 inner hub", quantity: 1, sceneItemSuppliedIds: ["109570"] },
      {
        name: "Howe ball joint",
        quantity: 2,
        sceneItemSuppliedIds: ["109690", "109700"],
      },
      { name: "SS Spindle", quantity: 1, sceneItemSuppliedIds: ["109720"] },
    ],
    sceneItemsVisible: step2SceneItemsVisible,
    sceneViewStateId: "79dca8ec-c839-4764-bfb9-1de1d6629e70",
    step: 2,
    title: "Install the spindle on the ball joints",
  },
  "step-3": {
    arrows: [
      {
        position: { x: -1490, y: 860, z: 185 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
        type: "down",
      },
    ],
    camera: step3Cam,
    instructions: () => [],
    parts: [
      {
        name: "M12 heim MHMR12T",
        quantity: 1,
        sceneItemSuppliedIds: ["100820"],
      },
      { name: "Toe Link", quantity: 1, sceneItemSuppliedIds: ["111740"] },
    ],
    sceneItemsVisible: step2SceneItemsVisible,
    sceneViewStateId: "09196930-ca37-4ddf-8adf-f695060bb8d4",
    step: 3,
    title: "Install the stabilizer arm",
  },
  "step-4": {
    arrows: [
      {
        position: { x: -1459, y: 650, z: 320 },
        rotation: {
          w: 0,
          x: -0.000016310950741171837,
          y: -0.9998411536216736,
          z: -0.01782582886517048,
        },
        type: "up",
      },
    ],
    camera: step4Cam,
    instructions: (onShow: (ids: string[]) => void) => [
      <>
        Torque the{" "}
        <Link
          onClick={() =>
            onShow(["109590", "109600", "109610", "109620", "109630"])
          }
        >
          M10x35 bolts
        </Link>{" "}
        to 45 ft/lbs.
      </>,
    ],
    parts: [
      {
        name: "M10x35",
        quantity: 5,
        sceneItemSuppliedIds: [
          "109590",
          "109600",
          "109610",
          "109620",
          "109630",
        ],
      },
      { name: "Fender frame", quantity: 1, sceneItemSuppliedIds: ["109710"] },
      { name: "Fender rear", quantity: 1, sceneItemSuppliedIds: ["109730"] },
    ],
    sceneItemsVisible: [
      ...step2SceneItemsVisible,
      "109590",
      "109600",
      "109610",
      "109620",
      "109630",
      "109710",
      "109730",
    ],
    sceneViewStateId: "3bebb15b-1245-4dd6-8e3c-e25de4c9e6ab",
    step: 4,
    title: "Install the fender frame",
  },
};

// Base scene items:
// 07680144-ffc7-4c67-aa09-d0a9fecf0a3a, tire
// 2462b043-be9b-48c7-b359-b7b3e5a55370, rim

/*
Color mods

f4136f80-a6e8-4339-a98a-b18d04c3abe1/109720, { "b": 191, "g": 127, "r": 84 }
9efb3d22-4377-4dfb-8359-6179829b47fe/109570, { "b": 174, "g": 174, "r": 174 }

c1db36ca-66f0-4918-9a93-c2bf209478be/109690 and a1e22d5a-ed29-4c63-8ed0-449b2cf6a173/109700, { "b": 80, "g": 160, "r": 250 }
9b497fe1-8032-4513-916c-ed20fad4a0db,111490 and f8751889-235f-455e-aff3-5c50a2095490,100820, { "b": 255, "g": 255, "r": 255 }
466997ea-8f24-4f4e-86cc-8b52a508dc7b/111700, and 2f9ba315-cf2f-466b-b6b1-f89392540a57/111740 { "b": 100, "g": 100, "r": 100 }
62a0d676-dc72-4bcc-b57b-23608d7b5215,109590, 73b24246-1648-4f89-af89-5bd39fcf1d1b,109620, f8cab8bd-7755-47c7-b39d-70f82ba8af55,109630, e3c28c65-a92d-4fee-b0de-49f1abe893ed,109610, 441ea531-36c6-4015-bf2e-d1dab388a58c,109600 { "b": 215, "g": 215, "r": 215 }
*/
