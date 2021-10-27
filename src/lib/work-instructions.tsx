import { Link } from "@mui/material";
import { Euler, Vector3 } from "@vertexvis/geometry";
import type { FrameCamera } from "@vertexvis/viewer/dist/types/lib/types";

import { getCamera, getThumbnails } from "./camera";

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

export interface InstructionStep {
  readonly arrows?: Arrow[];
  readonly camera: FrameCamera.FrameCamera;
  readonly instructions: (
    onShow: (name: string, ids: string[]) => void
  ) => React.ReactNode[];
  readonly parts: Part[];
  readonly sceneItemsVisible: string[];
  readonly sceneViewStateId: string;
  readonly step: number;
  readonly title: string;
}


const sceneViewStateId1 = "723234df-4b68-4600-9625-81b4db434dbc";
const sceneViewStateId2 = "38a18afb-6f22-4264-82f5-5bd11ab53e6d";
const sceneViewStateId3 = "a74c042b-3670-491d-97cd-06c6b2c1e890";
const sceneViewStateId4 = "59f295dc-8e1f-4ddf-8718-cfaefa32facf";


export const InstructionSteps: Record<string, InstructionStep> = {
  "step-1": {
    arrows: [
      {
        position: { x: -74.71805572509766,
          y: 289.2084045410156,
          z: -513.8933715820312 },
        rotation: { order: "xyz", x: 0, y: 0, z: 0 },
        type: "up",
      },
    ],
    camera: {
      position: {
        x: 24.922887802124023,
        y: 252.69744873046875,
        z: -723.9141845703125
      },
      lookAt: {
        x: -194.14573669433594,
        y: 302.7480773925781,
        z: -91.16386413574219
      },
      up: {
        x: 0.11671561747789383,
        y: 0.992434561252594,
        z: -0.038092728704214096
      }
    },
    instructions: (onShow: (name: string, ids: string[]) => void) => [
      <>
        Remove fasteners
      </>,
      <>Carefully remove the cover and set off to the side</>,
    ],
    parts: [

    ],
    sceneItemsVisible: [],
    sceneViewStateId: sceneViewStateId1,
    step: 1,
    title: "Removed Rear Cover",
  },
  "step-2": {
    arrows: [
      {
        position: { x: 274.0100402832031,
          y: 11.12000560760498,
          z: -222.43959045410156 },
        rotation: { order: "xyz", x: 0, y: 0, z: 0 },
        type: "up",
      },
    ],
    camera: {
      position: {
        x: -439.7635192871094,
        y: 557.271240234375,
        z: -1216.6805419921875
      },
      lookAt: {
        x: 41.65736770629883,
        y: 361.56524658203125,
        z: -519.7561645507812
      },
      up: {
        x: 0.05460376292467117,
        y: 0.9705057740211487,
        z: 0.23481236398220062
      }
    },
    instructions: (onShow: (name: string, ids: string[]) => void) => [
      <>
        If the belt is no longer attached to the Drum Pulley or Motor Spindle it needs to be replaced. If this is the case move on to step 3 if not...
      </>,
    ],
    parts: [
    ],
    sceneItemsVisible: [],
    sceneViewStateId: sceneViewStateId2,
    step: 2,
    title: "Inspect the belt",
  },
  "step-3": {
    arrows: [
      {
        position: { x: -87.63182067871094,
          y: 268.0404052734375,
          z: -524.8290405273438 },
        rotation: { order: "xyz", x: 0, y: 0, z: 0 },
        type: "down",
      },
    ],
    camera: {
      position: {
        x: 24.922887802124023,
        y: 252.69744873046875,
        z: -723.9141845703125
      },
      lookAt: {
        x: -194.14573669433594,
        y: 302.7480773925781,
        z: -91.16386413574219
      },
      up: {
        x: 0.11671561747789383,
        y: 0.992434561252594,
        z: -0.038092728704214096
      }
    },
    instructions: () => [
      
      <>To install the new belt the lower hose needs to be removed to allow the belt to slip over both pulleys.</>,
<>Pinch the clamp together with pliers and slide it towards the back of the unit.</>,
<>Slide the hose back off the fitting</>

    ],
    parts: [

    ],
    sceneItemsVisible: [],
    sceneViewStateId: sceneViewStateId3,
    step: 3,
    title: "Removing the lower hose",
  },
  "step-4": {
    arrows: [
      {
        position: { x: 60.8879508972168,
          y: 213.54518127441406,
          z: -477.5937805175781 },
        rotation: { order: "xyz", x: 0, y: -1, z: 0 },
        type: "up",
      },
    ],
    camera: {
      position: {
        x: -602.8243408203125,
        y: 486.87628173828125,
        z: -1242.0726318359375
      },
      lookAt: { x: 11.56212329864502, y: 407.2480163574219, z: -595.4032592773438 },
      up: {
        x: -0.3562106192111969,
        y: 0.8874346017837524,
        z: -0.292530357837677
      }
    },
    instructions: (onShow: (name: string, ids: string[]) => void) => [
      


<>To install the belt first place it on the lower motor spindle. Then roll it onto the drum pulley.</>,
<>After the belt has been installed put the hose and clamp back in place</>,
<>Attach the rear cover</>,

    ],
    parts: [

    ],
    sceneItemsVisible: [

    ],
    sceneViewStateId: sceneViewStateId4,
    step: 4,
    title: "Install the new belt",
  },
};
