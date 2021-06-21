import { Quaternion, Vector3 } from "@vertexvis/geometry";
import { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

interface Arrow {
  readonly position: Vector3.Vector3;
  readonly rotation: Quaternion.Quaternion;
}

interface Part {
  readonly quantity: number;
  readonly sceneItemSuppliedId: string;
  readonly other?: string[];
}

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: React.ReactNode[];
  readonly parts: Part[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}

const step1Cam: FrameCamera.FrameCamera = {
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

const step2Parts = [
  { quantity: 1, sceneItemSuppliedId: "100820" }, // M12 heim MHMR12T
  { quantity: 1, sceneItemSuppliedId: "109570" }, // Z06 inner hub(Default)
  { quantity: 2, sceneItemSuppliedId: "109690", other: ["109700"] }, // Howe ball joint ball 917-22320(Default)
  { quantity: 1, sceneItemSuppliedId: "109720" }, // SS Spindle Kyle Mirror(Default)
  { quantity: 1, sceneItemSuppliedId: "109740" }, // Outboard stub shaft
  { quantity: 1, sceneItemSuppliedId: "110850" }, // wheel mech housing
  { quantity: 1, sceneItemSuppliedId: "111490" }, // wheel axle(Default)
  { quantity: 1, sceneItemSuppliedId: "111700" }, // Control Arm RLLS
  { quantity: 1, sceneItemSuppliedId: "111740" }, // Toe Link
];

export const InstructionSteps: Record<string, InstructionStep> = {
  "1f4f69e2-196e-49dd-9455-2b0730e8a102": {
    camera: step1Cam,
    instructions: [
      <>
        Install (3) M12 x 1.25 mm torx head bolts with Loctite® Threadlocker
        271™.
      </>,
      <>Using a T55 socket torque the bolts to 75 ft./lbs.</>,
    ],
    parts: [
      { quantity: 1, sceneItemSuppliedId: "109570" }, // Z06 inner hub(Default)
      { quantity: 1, sceneItemSuppliedId: "109720" }, // SS Spindle Kyle Mirror(Default)
    ],
    sceneViewStateId: "1f4f69e2-196e-49dd-9455-2b0730e8a102",
    step: 1,
    title: "Install the inner hub on the spindle",
  },
  "eb77c1b4-76f3-4b3b-9f6a-f63408ebe6a7": {
    arrows: [
      {
        position: { x: -1350, y: 1075, z: 200 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
      },
    ],
    camera: step1Cam,
    instructions: [
      <>
        Clean the ID of the Spindle and the OD of the ball joints with brake
        cleaner and degreaser.
      </>,
      <>Wipe clean with lint free shop towel.</>,
      <>Install the washers and castle nuts on the ball joints.</>,
      <>Torque the castle nuts to 30 ft/lbs and turn it an additional 140°.</>,
      <>
        Ensure the castle nut notch lines up with the hole in the ball joint and
        install a cotter pin.
      </>,
    ],
    parts: step2Parts,
    sceneViewStateId: "eb77c1b4-76f3-4b3b-9f6a-f63408ebe6a7",
    step: 2,
    title: "Install the spindle on the ball joints",
  },
  "25d1a893-3879-4ced-8844-ec57348219ef": {
    arrows: [
      {
        position: { x: -1350, y: 1075, z: 200 },
        rotation: { w: 0.7071, x: 0, y: 0.7071, z: 0 },
      },
    ],
    camera: step3Cam,
    instructions: [],
    parts: step2Parts,
    sceneViewStateId: "25d1a893-3879-4ced-8844-ec57348219ef",
    step: 3,
    title: "Install the stabilizer arm",
  },
  "4e445630-cbe5-4e57-92a2-cfca5ee13317": {
    arrows: [
      {
        position: { x: -1459, y: 650, z: 320 },
        rotation: {
          w: 0,
          x: -0.000016310950741171837,
          y: -0.9998411536216736,
          z: -0.01782582886517048,
        },
      },
    ],
    camera: step4Cam,
    instructions: [<>Torque the bolts to 45 ft./lbs</>],
    parts: [
      ...step2Parts,
      {
        quantity: 5,
        sceneItemSuppliedId: "109590", // M10x35 90128A289(90128A289)
        other: ["109600", "109610", "109620", "109630"],
      },
      { quantity: 1, sceneItemSuppliedId: "109710" }, // fender frame(Default)
      { quantity: 1, sceneItemSuppliedId: "109730" }, // fender rear street(Default)
    ],
    sceneViewStateId: "4e445630-cbe5-4e57-92a2-cfca5ee13317",
    step: 4,
    title: "Install the fender frame",
  },
};
