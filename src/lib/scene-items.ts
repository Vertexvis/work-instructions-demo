import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { ColorMaterial, Components, TapEventDetails } from "@vertexvis/viewer";
import { Matrix4x4, Quaternion, Vector3 as Math3dVector3 } from "math3d";

const SelectColor = {
  ...ColorMaterial.create(255, 255, 0),
  glossiness: 4,
  specular: { r: 255, g: 255, b: 255, a: 0 },
};

interface Req {
  readonly viewer: Components.VertexViewer | null;
}

interface SelectByHitReq extends Req {
  readonly detail: TapEventDetails;
  readonly hit?: vertexvis.protobuf.stream.IHit;
}

const rimCam = {
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

const lugNutCam = {
  ...rimCam,
  position: {
    x: -2619.583984375,
    y: 2318.86181640625,
    z: 199.25672912597656,
  },
};

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
    .flyTo({ camera: lugNutCam })
    .render({ animation: { milliseconds: 1500 } });

  await scene
    .items((op) => {
      const idsQuery = op.where((q) =>
        q.withSuppliedIds([
          "108940", // 12x20 OZ HLT ET 3 SPOKE
          "108950", // michelin sport cup 2 345-30zr20 on rim_(Default)
          "109640", // wheel nut(Default)
          "109650", // wheel nut(Default)
          "109660", // wheel nut(Default)
          "109670", // wheel nut(Default)
          "109680", // wheel nut(Default)
          // Later
          // "109570", // Z06 inner hub(Default)
          // "109580", // Z06 disc and outer hub as a part(Default)
          // "109590", // M10x35 90128A289(90128A289)
          // "109600", // M10x35 90128A289(90128A289)
          // "109610", // M10x35 90128A289(90128A289)
          // "109620", // M10x35 90128A289(90128A289)
          // "109630", // M10x35 90128A289(90128A289)
          // "109690", // Howe ball joint ball 917-22320(Default)
          // "109700", // Howe ball joint ball 917-22320(Default)
          // "109710", // fender frame(Default)
          // "109720", // SS Spindle Kyle Mirror(Default)
        ])
      );
      return [
        op.where((q) => q.all()).hide(),
        idsQuery.show(),
        ...Object.keys(suppliedIdToTransform).map((k) =>
          op
            .where((q) => q.withSuppliedId(k))
            .transform(suppliedIdToTransform[k])
        ),
      ];
    })
    .execute();
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

export function toMatrix(posX: number, posY: number): number[] {
  return Matrix4x4.TRS(
    new Math3dVector3(posX, posY, -600),
    Quaternion.Euler(-180, 0, -43.58595040792774),
    1
  ).values;
}
