import { delay } from "@vertexvis/api-client-node";
import React from "react";

import { BottomDrawer } from "../components/BottomDrawer";
import { Layout } from "../components/Layout";
import { Content, RightDrawer } from "../components/RightDrawer";
import { DefectDialog } from "../components/DefectDialog";
import { Viewer } from "../components/Viewer";
import { Credentials, Env } from "../lib/env";
import {
  flyTo,
  SceneViewState,
  selectByHit as handleHit,
} from "../lib/scene-items";
import { useViewer } from "../lib/viewer";
import { Snackbar } from "@material-ui/core";

export default function Home(): JSX.Element {
  const viewer = useViewer();
  // const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
  //   undefined
  // );
  const [ready, setReady] = React.useState(false);
  const [rightDrawerContent, setRightDrawerContent] = React.useState<
    Content | undefined
  >(undefined);
  const [ghosted, setGhosted] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
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
    if (!ready || !svs || svs.id === sceneViewState?.id) return;

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
        <>
          {/* <Box
            sx={{
              alignItems: "flex-start",
              display: "flex",
              justifyContent: "space-between",
            }}
          > */}
          {/* </Box> */}
          {viewer.isReady && (
            <Viewer
              configEnv={Env}
              credentials={Credentials}
              onClick={(button) => {
                if (button === "settings" || button === "instructions") {
                  setRightDrawerContent(button);
                } else if (button === "defect") setDialogOpen(true);
              }}
              onSceneReady={onSceneReady}
              onSelect={async (detail, hit) => {
                await handleHit({ detail, hit, viewer: viewer.ref.current });
              }}
              sceneViewState={sceneViewState}
              streamAttributes={{
                experimentalGhosting: {
                  enabled: { value: ghosted },
                  opacity: { value: 0.7 },
                },
              }}
              viewer={viewer.ref}
            />
          )}
        </>
      }
      rightDrawer={
        <RightDrawer
          content={rightDrawerContent}
          onClose={() => setRightDrawerContent(undefined)}
          settings={{ onGhostToggle: setGhosted }}
        />
      }
    >
      {dialogOpen && (
        <DefectDialog
          onClose={() => setDialogOpen(false)}
          onConfirm={() => {
            setSnackOpen(true);
            setDialogOpen(false);
          }}
          open={dialogOpen}
        />
      )}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={(_e: React.SyntheticEvent, reason?: string) => {
          if (reason === "clickaway") return;

          setSnackOpen(false);
        }}
        message="Issue reported successfully."
      />
    </Layout>
  );
}
