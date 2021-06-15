import { delay } from "@vertexvis/api-client-node";
import React from "react";

import { BottomDrawer } from "../components/BottomDrawer";
import { Layout } from "../components/Layout";
import { Viewer } from "../components/Viewer";
import { Credentials, Env } from "../lib/env";
import {
  flyTo,
  SceneViewState,
  selectByHit as handleHit,
} from "../lib/scene-items";
import { useViewer } from "../lib/viewer";

export default function Home(): JSX.Element {
  const viewer = useViewer();
  // const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
  //   undefined
  // );
  const [ready, setReady] = React.useState(false);
  const [sceneViewState, setSceneViewState] = React.useState<
    SceneViewState | undefined
  >(undefined);

  async function onSceneReady() {
    const v = viewer.ref.current;
    if (v == null) return;

    const scene = await v.scene();
    if (scene == null) return;

    console.debug("sceneViewId", scene.sceneViewId);
    setReady(true);
    // setSceneViewId(scene.sceneViewId);
    // await initialize({ viewer: v });
  }

  // async function createSvs(name: string): Promise<void> {
  //   await (
  //     await fetch(`http://localhost:3000/api/scene-view-states`, {
  //       method: "POST",
  //       body: JSON.stringify({ name, sceneViewId }),
  //     })
  //   ).json();
  // }

  async function onSceneViewStateSelected(svs?: SceneViewState): Promise<void> {
    if (!ready || !svs) return;

    setReady(false);
    function onComplete() {
      delay(500).then(() => {
        setSceneViewState(svs);
        setReady(true);
      });
    }

    const res = await flyTo({ camera: svs.camera, viewer: viewer.ref.current });
    res ? res.onAnimationCompleted.on(onComplete) : onComplete();
  }

  return (
    <Layout
      bottomDrawer={
        <BottomDrawer onSelect={onSceneViewStateSelected} ready={ready} />
      }
      // header={<Header onCreateSceneViewState={createSvs} />}
      main={
        viewer.isReady && (
          <Viewer
            configEnv={Env}
            credentials={Credentials}
            onSceneReady={onSceneReady}
            onSelect={async (detail, hit) => {
              await handleHit({ detail, hit, viewer: viewer.ref.current });
            }}
            sceneViewState={sceneViewState}
            streamAttributes={{
              experimentalGhosting: {
                enabled: { value: true },
                opacity: { value: 0.7 },
              },
            }}
            viewer={viewer.ref}
          ></Viewer>
        )
      }
    />
  );
}
