import React, { createContext, useContext, useState } from 'react';

export const ViewerContext = createContext<IViewerContext | null>(null);

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

interface IViewerContext {
	streamKey: string | null;
	setStreamKey: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ViewerContextProvider({
	children,
}: ViewerContextProviderProps) {
	const [streamKey, setStreamKey] = useState<string | null>(null);

	return (
		<ViewerContext.Provider
			value={{
				streamKey,
				setStreamKey,
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
