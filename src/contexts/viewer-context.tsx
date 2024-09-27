import { InstructionStep } from '@lib/work-instructions';
import React, { createContext, useContext, useState } from 'react';

export const ViewerContext = createContext<IViewerContext | null>(null);

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

// TODO: Determine if the context needs to be split up.
interface IViewerContext {
	streamKey: string | null;
	setStreamKey: React.Dispatch<React.SetStateAction<string | null>>;
	instructionStep: InstructionStep | null;
	setInstructionStep: React.Dispatch<
		React.SetStateAction<InstructionStep | null>
	>;
}

export function ViewerContextProvider({
	children,
}: ViewerContextProviderProps) {
	const [streamKey, setStreamKey] = useState<string | null>(null);
	const [instructionStep, setInstructionStep] =
		useState<InstructionStep | null>(null);

	return (
		<ViewerContext.Provider
			value={{
				streamKey,
				setStreamKey,
				instructionStep,
				setInstructionStep,
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
