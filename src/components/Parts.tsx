import { ContentHeader } from '@components/ContentHeader';
import { NoStepActive } from '@components/NoStepActive';
import { InstructionStep } from '@lib/work-instructions';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { head } from '@vertexvis/api-client-node';
import React from 'react';

interface Props {
	readonly onClose: () => void;
	readonly onShow: (name: string, ids: string[]) => void;
	readonly step: InstructionStep | null;
}

export function Parts({ onClose, onShow, step }: Props): JSX.Element {
	function NoContent(): JSX.Element {
		return step == null ? (
			<NoStepActive />
		) : (
			<Typography sx={{ mb: 2 }}>No parts provided.</Typography>
		);
	}

	const stepNum = step?.step ? `Step ${step.step} ` : '';
	return (
		<>
			<ContentHeader onClose={onClose} title={`${stepNum} Parts`} />
			{step?.parts != null && step.parts.length > 0 ? (
				step?.parts.map((p, i) => (
					<Link
						color="inherit"
						key={i}
						onClick={() => onShow(p.name, p.sceneItemSuppliedIds)}
						sx={{
							alignItems: 'center',
							cursor: 'pointer',
							display: 'flex',
						}}
						underline="none"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt={`Part revision thumbnail for scene item ${head(
								p.sceneItemSuppliedIds,
							)}`}
							height={120}
							src={`/${head(p.sceneItemSuppliedIds)}.png`}
						/>
						<Typography
							sx={{ mb: 2 }}
						>{`${p.name} x ${p.quantity}`}</Typography>
					</Link>
				))
			) : (
				<NoContent />
			)}
		</>
	);
}
