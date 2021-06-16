/* @jsx jsx */ /** @jsxRuntime classic */ import { jsx } from "@emotion/react";
import { SpeedDial, SpeedDialAction } from "@material-ui/core";
import {
  ReportProblemOutlined,
  Settings,
  TextSnippetOutlined,
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
import { loadSceneViewState, SceneViewState } from "../lib/scene-items";
import { Stations } from "./Stations";

interface ViewerProps extends ViewerJSX.VertexViewer {
  readonly credentials: StreamCredentials;
  readonly onClick: (button: ToolButtons) => void;
  readonly sceneViewState?: SceneViewState;
  readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

type ViewerComponentType = React.ComponentType<
  ViewerProps & React.RefAttributes<HTMLVertexViewerElement>
>;

type HOCViewerProps = React.RefAttributes<HTMLVertexViewerElement>;

export const Viewer = onTap(UnwrappedViewer);

export type ToolButtons = "settings" | "instructions" | "defect";

function UnwrappedViewer({
  credentials,
  onClick,
  sceneViewState,
  viewer,
  ...props
}: ViewerProps): JSX.Element {
  const urn = `urn:vertexvis:stream-key:${credentials.streamKey}`;
  const src = urn;
  // const src = sceneViewState?.id
  //   ? `${urn}?scene-view-state=${sceneViewState.id}`
  //   : urn;
  const actions: {
    icon: React.ReactNode;
    name: string;
    onClick: () => void;
  }[] = [
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
      icon: <ReportProblemOutlined />,
      name: "Log defect",
      onClick: () => onClick("defect"),
    },
  ];

  React.useEffect(() => {
    loadSceneViewState({ id: sceneViewState?.id, viewer: viewer.current });
  }, [sceneViewState, viewer]);

  return (
    <VertexViewer
      css={{ height: "100%", width: "100%" }}
      clientId={credentials.clientId}
      ref={viewer}
      src={src}
      {...props}
    >
      <VertexViewerToolbar placement="top-left">
        <Stations />
      </VertexViewerToolbar>
      <VertexViewerToolbar placement="top-right">
        <SpeedDial
          ariaLabel="Toolbar"
          direction="down"
          hidden={true}
          open={true}
          sx={{ mt: -2 }}
        >
          {actions.map((action) => (
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
        {sceneViewState?.arrows?.map((a, i) => (
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
