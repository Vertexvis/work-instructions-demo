/* @jsx jsx */ /** @jsxRuntime classic */ import { jsx } from "@emotion/react";
import { Box, Link, SpeedDial, SpeedDialAction } from "@material-ui/core";
import {
  ReportProblemOutlined,
  Settings,
  TextSnippetOutlined,
  WidgetsOutlined,
  ZoomOutMap,
} from "@material-ui/icons";
import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { TapEventDetails } from "@vertexvis/viewer";
import {
  JSX as ViewerJSX,
  VertexViewer,
  VertexViewerDomElement,
  VertexViewerDomRenderer,
  VertexViewerToolbar,
} from "@vertexvis/viewer-react";
import React from "react";

import { StreamCredentials } from "../lib/env";
import { loadSceneViewState } from "../lib/scene-items";
import { InstructionStep } from "../lib/work-instructions";
import { Stations } from "./Stations";

interface ViewerProps extends ViewerJSX.VertexViewer {
  readonly credentials: StreamCredentials;
  readonly instructionStep?: InstructionStep;
  readonly onClick: (button: ToolButtons) => void;
  readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

interface Action {
  readonly icon: React.ReactNode;
  readonly name: string;
  readonly onClick: () => void;
}

type ViewerComponentType = React.ComponentType<
  ViewerProps & React.RefAttributes<HTMLVertexViewerElement>
>;

type HOCViewerProps = React.RefAttributes<HTMLVertexViewerElement>;

export const Viewer = onTap(UnwrappedViewer);

export type ToolButtons = "settings" | "instructions" | "parts" | "issue";

function UnwrappedViewer({
  credentials,
  onClick,
  instructionStep,
  viewer,
  ...props
}: ViewerProps): JSX.Element {
  const AnimationDurationMs = 1500;
  const src = `urn:vertexvis:stream-key:${credentials.streamKey}`;
  const instructionActions: Action[] = [
    {
      icon: <Settings />,
      name: "Settings",
      onClick: () => onClick("settings"),
    },
    {
      icon: <TextSnippetOutlined />,
      name: "Instructions",
      onClick: () => onClick("instructions"),
    },
    {
      icon: <WidgetsOutlined />,
      name: "Parts List",
      onClick: () => onClick("parts"),
    },
    {
      icon: <ReportProblemOutlined />,
      name: "Report issue",
      onClick: () => onClick("issue"),
    },
  ];

  const viewActions: Action[] = [
    {
      icon: <ZoomOutMap />,
      name: "Fit all",
      onClick: () => fitAll(),
    },
  ];

  React.useEffect(() => {
    loadSceneViewState({
      id: instructionStep?.sceneViewStateId,
      viewer: viewer.current,
    });
  }, [instructionStep, viewer]);

  async function fitAll(): Promise<void> {
    (await viewer.current?.scene())
      ?.camera()
      .viewAll()
      .render({ animation: { milliseconds: AnimationDurationMs } });
  }

  return (
    <VertexViewer
      css={{ height: "100%", width: "100%" }}
      clientId={credentials.clientId}
      ref={viewer}
      src={src}
      {...props}
    >
      <VertexViewerToolbar placement="top-left">
        <Box sx={{ alignItems: "center", display: "flex", ml: 3, mt: 3 }}>
          <Stations sx={{ mr: 2 }} />
          <Link
            href="https://github.com/Vertexvis/work-instructions-demo"
            rel="noreferrer"
            style={{ alignSelf: "center" }}
            // sx={{ height: "100%", alignSelf: "center" }}
            target="_blank"
          >
            View on GitHub
          </Link>
        </Box>
      </VertexViewerToolbar>
      <VertexViewerToolbar placement="top-right">
        <SpeedDial
          ariaLabel="Work instruction toolbar"
          direction="down"
          hidden={true}
          open={true}
          sx={{ mr: 3 }}
        >
          {instructionActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => action.onClick()}
            />
          ))}
        </SpeedDial>
      </VertexViewerToolbar>
      <VertexViewerToolbar placement="bottom-right">
        <SpeedDial
          ariaLabel="Viewer toolbar"
          hidden={true}
          open={true}
          sx={{ mr: 3, mb: 2 }}
        >
          {viewActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => action.onClick()}
            />
          ))}
        </SpeedDial>
      </VertexViewerToolbar>
      <VertexViewerDomRenderer>
        {instructionStep?.arrows?.map((a, i) => (
          <VertexViewerDomElement
            key={i}
            position={a.position}
            rotation={a.rotation}
            billboardOff={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#60A5FA"
              css={{ width: 144, height: 144 }}
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </VertexViewerDomElement>
        ))}
      </VertexViewerDomRenderer>
    </VertexViewer>
  );
}

interface OnSelectProps extends HOCViewerProps {
  readonly onSelect: (
    detail: TapEventDetails,
    hit?: vertexvis.protobuf.stream.IHit
  ) => Promise<void>;
}

function onTap<P extends ViewerProps>(
  WrappedViewer: ViewerComponentType
): React.FunctionComponent<P & OnSelectProps> {
  return function Component({ viewer, onSelect, ...props }: P & OnSelectProps) {
    return (
      <WrappedViewer
        viewer={viewer}
        {...props}
        onTap={async (e) => {
          if (props.onTap) props.onTap(e);

          if (!e.defaultPrevented) {
            const scene = await viewer.current?.scene();
            const raycaster = scene?.raycaster();

            if (raycaster != null) {
              const res = await raycaster.hitItems(e.detail.position, {
                includeMetadata: true,
              });
              const hit = (res?.hits ?? [])[0];
              await onSelect(e.detail, hit);
            }
          }
        }}
      />
    );
  };
}
