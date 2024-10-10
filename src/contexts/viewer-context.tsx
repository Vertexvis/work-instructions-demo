import { InstructionStep, WorkInstructions } from '@lib/work-instructions';
import React, { createContext, useContext, useState } from 'react';

export const ViewerContext = createContext<IViewerContext | null>(null);

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

// TODO: Determine if the context needs to be split up.
interface IViewerContext {
	streamKey: string | null; // probably remove this and pull from workInstructions.
	setStreamKey: React.Dispatch<React.SetStateAction<string | null>>;
	selectedInstructionStep: InstructionStep | null;
	setSelectedInstructionStep: React.Dispatch<
		React.SetStateAction<InstructionStep | null>
	>;
	workInstructions: WorkInstructions | null;
	setWorkInstructions: React.Dispatch<
		React.SetStateAction<WorkInstructions | null>
	>;
}

export function ViewerContextProvider({
	children,
}: ViewerContextProviderProps) {
	const [streamKey, setStreamKey] = useState<string | null>(null);
	const [selectedInstructionStep, setSelectedInstructionStep] =
		useState<InstructionStep | null>(null);
	const [workInstructions, setWorkInstructions] =
		useState<WorkInstructions | null>(null);

	return (
		<ViewerContext.Provider
			value={{
				streamKey,
				setStreamKey,
				selectedInstructionStep,
				setSelectedInstructionStep,
				workInstructions,
				setWorkInstructions,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext() {
	const context = useContext(ViewerContext);
	if (!context) {
		throw new Error(
			'Viewer context should be used within ViewerContextProvider',
		);
	}
	return context;
}
