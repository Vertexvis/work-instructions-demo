/* eslint-disable @typescript-eslint/no-misused-promises */
/* @jsx jsx */ /** @jsxRuntime classic */
import { ArrowDown, ArrowUp } from '@components/Arrow';
import { InstructionSpeedDial } from '@components/InstructionSpeedDial';
//import { Stations } from '@components/Stations';
import { ViewerSpeedDial } from '@components/ViewerSpeedDial';
import { jsx } from '@emotion/react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { vertexvis } from '@vertexvis/frame-streaming-protos';
import type { JSX as ViewerJSX, TapEventDetails } from '@vertexvis/viewer';
import {
	VertexViewer,
	VertexViewerDomElement,
	VertexViewerDomGroup,
	VertexViewerDomRenderer,
	VertexViewerToolbar,
} from '@vertexvis/viewer-react';

import { useViewerContext } from '../contexts/viewer-context';

interface ViewerProps extends ViewerJSX.VertexViewer {
	readonly onClick: (button: ToolButtons) => void;
	readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

interface OnSelectProps extends HOCViewerProps {
	readonly onSelect: (
		detail: TapEventDetails,
		hit?: vertexvis.protobuf.stream.IHit,
	) => Promise<void>;
}

export interface Action {
	readonly icon: React.ReactNode;
	readonly name: string;
	readonly onClick: () => void;
}

export type ToolButtons = 'instructions' | 'parts' | 'issue';

type ViewerComponentType = React.ComponentType<
	ViewerProps & React.RefAttributes<HTMLVertexViewerElement>
>;

type HOCViewerProps = React.RefAttributes<HTMLVertexViewerElement>;

export const AnimationDurationMs = 1500;
export const Viewer = onTap(UnwrappedViewer);

function UnwrappedViewer({
	onClick,
	viewer,
	...props
}: ViewerProps): JSX.Element {
	const viewerContext = useViewerContext();

	const streamKey = viewerContext.streamKey;
	const instructionStep = viewerContext.selectedInstructionStep;

	const src = `urn:vertex:stream-key:${streamKey}`;

	return (
		<VertexViewer
			css={{ height: '100%', width: '100%' }}
			ref={viewer}
			src={src}
			{...props}
		>
			<VertexViewerToolbar placement="top-left">
				<Box sx={{ alignItems: 'center', display: 'flex', ml: 2, mt: 3 }}>
					{/* <Stations sx={{ backgroundColor: 'white', mr: 2 }} /> */}
					<Link
						href="https://github.com/Vertexvis/work-instructions-demo"
						rel="noreferrer"
						style={{ alignSelf: 'center' }}
						target="_blank"
					>
						View on GitHub
					</Link>
				</Box>
			</VertexViewerToolbar>
			<VertexViewerToolbar placement="top-right">
				<InstructionSpeedDial onClick={onClick} />
			</VertexViewerToolbar>
			<VertexViewerToolbar placement="bottom-right">
				<ViewerSpeedDial onClick={onClick} viewer={viewer} />
			</VertexViewerToolbar>
			<VertexViewerDomRenderer>
				<VertexViewerDomGroup>
					{instructionStep?.doms?.map((a, i) => (
						<VertexViewerDomElement
							key={i}
							positionJson={JSON.stringify(a.position)}
							rotationJson={JSON.stringify(a.rotation)}
							billboardOff={true}
						>
							{a.type === 'down' ? <ArrowDown /> : <ArrowUp />}
						</VertexViewerDomElement>
					))}
				</VertexViewerDomGroup>
			</VertexViewerDomRenderer>
		</VertexViewer>
	);
}

function onTap<P extends ViewerProps>(
	WrappedViewer: ViewerComponentType,
): React.FunctionComponent<P & OnSelectProps> {
	return function Component({ viewer, onSelect, ...props }: P & OnSelectProps) {
		return (
			<WrappedViewer
				viewer={viewer}
				{...props}
				onTap={async (e) => {
					if (e.defaultPrevented) {
						return;
					}

					if (props.onTap) props.onTap(e);

					const scene = await viewer.current?.scene();
					const raycaster = scene?.raycaster();

					if (raycaster != null) {
						const res = await raycaster.hitItems(e.detail.position, {
							includeMetadata: true,
						});
						const hit = (res?.hits ?? [])[0];
						await onSelect(e.detail, hit);
					}
				}}
			/>
		);
	};
}
