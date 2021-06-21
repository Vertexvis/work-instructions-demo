import { ColorMaterial, Components } from "@vertexvis/viewer";

import { AnimationDurationMs, SelectColor } from "./scene-items";
import { Step1Cam } from "./work-instructions";

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
        body: JSON.stringify({ name, sceneViewId }),
        method: "POST",
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
    .flyTo({ camera: Step1Cam })
    .render({ animation: { milliseconds: AnimationDurationMs } });

  await scene
    .items((op) => {
      const idsQuery = op.where((q) =>
        q.withSuppliedIds([
          "109570", // Z06 inner hub(Default)
          "109720", // SS Spindle Kyle Mirror(Default)
        ])
      );
      return [
        // ...Object.keys(SuppliedIdToTransform).map((k) =>
        //   op
        //     .where((q) => q.withSuppliedId(k))
        //     .show()
        //     .transform(SuppliedIdToTransform[k])
        //     .materialOverride(ActivePartColor)
        // ),
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
        body: JSON.stringify({ partRevisionId }),
        method: "POST",
      })
    ).json()
  );
}
