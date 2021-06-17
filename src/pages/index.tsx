import { Snackbar } from "@material-ui/core";
import { delay } from "@vertexvis/api-client-node";
import React from "react";

import { BottomDrawer } from "../components/BottomDrawer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { ReportIssueDialog } from "../components/ReportIssueDialog";
import { Content, RightDrawer } from "../components/RightDrawer";
import { Viewer } from "../components/Viewer";
import {
  createSceneViewState,
  initializeScene,
  renderPartRevision,
} from "../lib/authoring";
import { Config, Configuration, Credentials } from "../lib/env";
import { flyTo, selectByHit as onSelect } from "../lib/scene-items";
import { useViewer } from "../lib/viewer";
import { InstructionStep } from "../lib/work-instructions";

export const getServerSideProps = (): Record<string, Configuration> => {
  return {
    props: {
      authoring: Config.authoring,
      vertexEnv: Config.vertexEnv,
    },
  };
};

export default function Home({
  authoring,
  vertexEnv,
}: Configuration): JSX.Element {
  const viewer = useViewer();
  const [sceneViewId, setSceneViewId] = React.useState<string | undefined>(
    undefined
  );
  const [ready, setReady] = React.useState(false);
  const [rightDrawerContent, setRightDrawerContent] = React.useState<
    Content | undefined
  >();
  const [ghosted, setGhosted] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<{ partRevisionId?: string }>(
    {}
  );
  const [instructionStep, setInstructionStep] = React.useState<
    InstructionStep | undefined
  >();

  async function onSceneReady() {
    const v = viewer.ref.current;
    if (v == null) return;

    const scene = await v.scene();
    if (scene == null) return;

    console.debug("sceneViewId", scene.sceneViewId);
    setReady(true);
    setSceneViewId(scene.sceneViewId);
    if (authoring) await initializeScene({ viewer: v });
  }

  async function onInstructionStepSelected(
    is?: InstructionStep
  ): Promise<void> {
    if (!ready || is?.sceneViewStateId === instructionStep?.sceneViewStateId) {
      return;
    }

    setReady(false);
    function onComplete() {
      delay(500).then(() => {
        setInstructionStep(is);
        setReady(true);
      });
    }

    const res = await flyTo({ camera: is?.camera, viewer: viewer.ref.current });
    res ? res.onAnimationCompleted.on(onComplete) : onComplete();
  }

  return (
    <Layout
      bottomDrawer={
        <BottomDrawer onSelect={onInstructionStepSelected} ready={ready} />
      }
      header={
        authoring && (
          <Header
            onCreateSceneViewState={(name) =>
              createSceneViewState({ name, sceneViewId })
            }
            onRenderPartRevision={() =>
              renderPartRevision({ partRevisionId: selected.partRevisionId })
            }
          />
        )
      }
      main={
        viewer.isReady && (
          <Viewer
            configEnv={vertexEnv}
            credentials={Credentials}
            onClick={(button) => {
              if (
                button === "settings" ||
                button === "instructions" ||
                button === "parts"
              ) {
                setRightDrawerContent(button);
              } else if (button === "issue") {
                setDialogOpen(true);
              }
            }}
            onSceneReady={onSceneReady}
            onSelect={async (detail, hit) => {
              setSelected({
                partRevisionId: hit?.partRevisionId?.hex ?? undefined,
              });
              await onSelect({ detail, hit, viewer: viewer.ref.current });
            }}
            instructionStep={instructionStep}
            streamAttributes={{
              experimentalGhosting: {
                enabled: { value: ghosted },
                opacity: { value: 0.7 },
              },
            }}
            viewer={viewer.ref}
          />
        )
      }
      rightDrawer={
        <RightDrawer
          content={rightDrawerContent}
          instructionStep={instructionStep}
          onClose={() => setRightDrawerContent(undefined)}
          settings={{ ghosted, onGhostToggle: setGhosted }}
        />
      }
    >
      {dialogOpen && (
        <ReportIssueDialog
          onClose={() => setDialogOpen(false)}
          onConfirm={() => {
            setSnackOpen(true);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          partRevisionId={selected.partRevisionId}
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
