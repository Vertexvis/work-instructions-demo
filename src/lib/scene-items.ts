import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { ColorMaterial, Components, TapEventDetails } from "@vertexvis/viewer";

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

export async function initialize({ viewer }: Req): Promise<void> {
  if (viewer == null) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  await scene.items((op) => op.where((q) => q.all()).hide()).execute();
  await scene
    .items((op) => {
      const idsQuery = op.where((q) =>
        q.withSuppliedIds([
          "108940", // 12x20 OZ HLT ET 3 SPOKE
          "108950", // michelin sport cup 2 345-30zr20 on rim_(Default)
          "109570", // Z06 inner hub(Default)
          "109580", // Z06 disc and outer hub as a part(Default)
          "109590", // M10x35 90128A289(90128A289)
          "109600", // M10x35 90128A289(90128A289)
          "109610", // M10x35 90128A289(90128A289)
          "109620", // M10x35 90128A289(90128A289)
          "109630", // M10x35 90128A289(90128A289)
          "109640", // wheel nut(Default)
          "109650", // wheel nut(Default)
          "109660", // wheel nut(Default)
          "109670", // wheel nut(Default)
          "109680", // wheel nut(Default)
          "109690", // Howe ball joint ball 917-22320(Default)
          "109700", // Howe ball joint ball 917-22320(Default)
          "109710", // fender frame(Default)
          "109720", // SS Spindle Kyle Mirror(Default)
        ])
      );
      return [op.where((q) => q.all()).hide(), idsQuery.show()];
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
