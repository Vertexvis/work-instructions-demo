/* eslint-disable @typescript-eslint/no-misused-promises */
import { Action, AnimationDurationMs, ToolButtons } from '@components/Viewer';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import ZoomOutMapOutlined from '@mui/icons-material/ZoomOutMapOutlined';
import { red } from '@mui/material/colors';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

interface Props {
	readonly onClick: (button: ToolButtons) => void;
	readonly viewer: React.MutableRefObject<HTMLVertexViewerElement | null>;
}

export function ViewerSpeedDial({ onClick, viewer }: Props): JSX.Element {
	const actions: Action[] = [
		{
			icon: <ZoomOutMapOutlined />,
			name: 'Fit all',
			onClick: () => fitAll(),
		},
		{
			icon: <ReportProblemOutlined style={{ color: red[500] }} />,
			name: 'Report issue',
			onClick: () => onClick('issue'),
		},
	];

	async function fitAll(): Promise<void> {
		await (
			await viewer.current?.scene()
		)
			?.camera()
			.viewAll()
			.render({ animation: { milliseconds: AnimationDurationMs } });
	}

	return (
		<SpeedDial
			ariaLabel="Viewer toolbar"
			hidden={true}
			open={true}
			sx={{ mr: 2, mb: 0 }}
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
	);
}
