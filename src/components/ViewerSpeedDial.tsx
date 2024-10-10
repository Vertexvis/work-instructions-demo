/* eslint-disable @typescript-eslint/no-misused-promises */
import { Action, AnimationDurationMs, ToolButtons } from '@components/Viewer';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
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
			icon: <ReportProblemOutlined style={{ color: red[500] }} />,
			name: 'Report issue',
			onClick: () => onClick('issue'),
		},
		{
			icon: <RestoreIcon />,
			name: 'Reset Scene',
			onClick: () => {
				void resetScene();
			},
		},
		{
			icon: <ZoomOutMapOutlined />,
			name: 'Fit all',
			onClick: () => {
				void fitAll();
			},
		},
	];

	async function fitAll(): Promise<void> {
		const scene = await viewer.current?.scene();
		await scene
			?.camera()
			.viewAll()
			.render({ animation: { milliseconds: AnimationDurationMs } });
	}

	async function resetScene(): Promise<void> {
		await (await viewer.current?.scene())?.reset({ includeCamera: true });
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
