import React from "react";

import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Viewer } from "../components/Viewer";
import { Credentials, Env } from "../lib/env";
import { initialize, selectByHit as handleHit } from "../lib/scene-items";
import { useViewer } from "../lib/viewer";

export default function Home(): JSX.Element {
  const viewer = useViewer();
  const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
    undefined
  );

  async function onSceneReady() {
    const v = viewer.ref.current;
    if (v == null) return;

    const scene = await v.scene();
    if (scene == null) return;

    console.log("sceneViewId", scene.sceneViewId);
    setSceneViewId(scene.sceneViewId);
    await initialize({ viewer: v });
  }

  async function createSvs(name: string): Promise<void> {
    console.log("sceneViewId", name, sceneViewId);
    // console.log(
    //   await (
    //     await fetch(`http://localhost:3000/api/scene-view-states`, {
    //       method: "POST",
    //       body: JSON.stringify({ name, sceneViewId }),
    //     })
    //   ).json()
    // );
  }

  return (
    <Layout
      header={<Header onCreateSceneViewState={createSvs} />}
      main={
        viewer.isReady && (
          <Viewer
            configEnv={Env}
            credentials={Credentials}
            onSceneReady={() => onSceneReady()}
            onSelect={async (detail, hit) => {
              await handleHit({ detail, hit, viewer: viewer.ref.current });
            }}
            streamAttributes={{
              experimentalGhosting: {
                enabled: { value: true },
                opacity: { value: 0.7 },
              },
            }}
            viewer={viewer.ref}
          />
        )
      }
    />
  );
}
