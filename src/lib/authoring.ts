import { ColorMaterial, Components } from "@vertexvis/viewer";

import { AnimationDurationMs, SelectColor } from "./scene-items";
import { LugNutCam, SuppliedIdToTransform } from "./work-instructions";

interface InitializeReq {
  readonly viewer: Components.VertexViewer | null;
}

export interface CreateSceneViewStateReq {
  readonly name: string;
  readonly sceneViewId?: string;
}

export interface RenderPartRevisionReq {
  readonly partRevisionId?: string;
}

const ActivePartColor = {
  ...SelectColor,
  ...ColorMaterial.fromHex("F59E0B"),
};

const BaseUrl = "http://localhost:3000";

export async function createSceneViewState({
  name,
  sceneViewId,
}: CreateSceneViewStateReq): Promise<void> {
  if (!sceneViewId) return;

  console.debug(
    await (
      await fetch(`${BaseUrl}/api/scene-view-states`, {
        method: "POST",
        body: JSON.stringify({ name, sceneViewId }),
      })
    ).json()
  );
}

export async function initializeScene({
  viewer,
}: InitializeReq): Promise<void> {
  if (viewer == null) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  await scene
    .camera()
    .flyTo({ camera: LugNutCam })
    .render({ animation: { milliseconds: AnimationDurationMs } });

  await scene
    .items((op) => {
      const idsQuery = op.where((q) =>
        q.withSuppliedIds([
          "108940", // 12x20 OZ HLT ET 3 SPOKE
          "108950", // michelin sport cup 2 345-30zr20 on rim_(Default)
        ])
      );
      return [
        ...Object.keys(SuppliedIdToTransform).map((k) =>
          op
            .where((q) => q.withSuppliedId(k))
            .show()
            .transform(SuppliedIdToTransform[k])
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

export async function renderPartRevision({
  partRevisionId,
}: RenderPartRevisionReq): Promise<void> {
  if (!partRevisionId) return;

  console.debug(
    await (
      await fetch(`${BaseUrl}/api/part-revisions`, {
        method: "POST",
        body: JSON.stringify({ partRevisionId }),
      })
    ).json()
  );
}
