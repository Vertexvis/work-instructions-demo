import { AnimationDurationMs } from "@lib/scene-items";
import { InstructionSteps } from "@lib/work-instructions";
import { head } from "@vertexvis/api-client-node";
import type { Components } from "@vertexvis/viewer";

interface InitializeReq {
  readonly viewer: Components.VertexViewer | null;
}

export interface CreateSceneViewStateReq {
  readonly name: string;
  readonly sceneViewId?: string;
}

export interface Part {
  readonly name?: string;
  readonly revisionId?: string;
}

export interface RenderPartRevisionReq {
  readonly part?: Part;
  readonly sceneItemSuppliedId?: string;
}

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

  const { camera, sceneItemsVisible } = head(
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
        op.where((q) => q.withSuppliedIds(sceneItemsVisible)).show(),
      ];
    })
    .execute();
}

export async function renderPartRevision({
  part,
  sceneItemSuppliedId,
}: RenderPartRevisionReq): Promise<void> {
  if (!part || !part.revisionId || !sceneItemSuppliedId) return;

  console.debug(
    await (
      await fetch(`${BaseUrl}/api/part-revisions`, {
        body: JSON.stringify({
          partRevisionId: part.revisionId,
          sceneItemSuppliedId,
        }),
        method: "POST",
      })
    ).json()
  );
}
