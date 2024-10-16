import { Instructions } from '@components/Instructions';
import { BottomDrawerHeight, RightDrawerWidth } from '@components/Layout';
import { Parts } from '@components/Parts';
import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import React from 'react';

export type Content = 'instructions' | 'parts';

interface Props {
	readonly content?: Content;
	readonly onBeginAssembly: () => void;
	readonly onClose: () => void;
	readonly open: boolean;
	readonly onShow: (name: string, ids: string[]) => void;
}

export function RightDrawer({
	content,
	onBeginAssembly,
	onClose,
	open,
	onShow,
}: Props): JSX.Element {
	if (content == null) return <></>;

	function Content() {
		if (content === 'instructions')
			return (
				<Instructions
					onBeginAssembly={onBeginAssembly}
					onClose={onClose}
					onShow={onShow}
				/>
			);
		return <Parts onClose={onClose} onShow={onShow} />;
	}

	return (
		<Drawer
			anchor="right"
			open={open}
			sx={{
				flexShrink: 0,
				width: RightDrawerWidth,
				[`& .${drawerClasses.paper}`]: {
					height: `calc(100% - ${BottomDrawerHeight}px)`,
					width: RightDrawerWidth,
				},
			}}
			variant="persistent"
		>
			<Box sx={{ p: 2 }}>
				<Content />
			</Box>
		</Drawer>
	);
}
