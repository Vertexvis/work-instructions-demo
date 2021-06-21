import { head } from "@vertexvis/api-client-node";
import { ColorMaterial, Components } from "@vertexvis/viewer";

import { AnimationDurationMs, SelectColor } from "./scene-items";
import { InstructionSteps } from "./work-instructions";

interface InitializeReq {
  readonly viewer: Components.VertexViewer | null;
}

export interface CreateSceneViewStateReq {
  readonly name: string;
  readonly sceneViewId?: string;
}

export interface RenderPartRevisionReq {
  readonly partRevisionId?: string;
  readonly sceneItemSuppliedId?: string;
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

  const { camera, parts } = head(
    Object.values(InstructionSteps).filter((v) => v.step === 4)
  );

  await scene
    .camera()
    .flyTo({ camera })
    .render({ animation: { milliseconds: AnimationDurationMs } });

  await scene
    .items((op) => {
      return [
        op.where((q) => q.all()).hide(),
        op
          .where((q) =>
            q.withSuppliedIds(
              parts.flatMap((p) =>
                p.other
                  ? p.other.concat(p.sceneItemSuppliedId)
                  : p.sceneItemSuppliedId
              )
            )
          )
          .show(),
        // op
        //   .where((q) => q.withSuppliedId("108940"))
        //   .materialOverride(ActivePartColor),
      ];
    })
    .execute();
}

export async function renderPartRevision({
  partRevisionId,
  sceneItemSuppliedId,
}: RenderPartRevisionReq): Promise<void> {
  if (!partRevisionId || !sceneItemSuppliedId) return;

  console.debug(
    await (
      await fetch(`${BaseUrl}/api/part-revisions`, {
        body: JSON.stringify({ partRevisionId, sceneItemSuppliedId }),
        method: "POST",
      })
    ).json()
  );
}
