import { applyPolyfills, defineCustomElements } from '@vertexvis/viewer/loader';
import React from 'react';

interface Viewer {
	readonly ref: React.MutableRefObject<HTMLVertexViewerElement | null>;
	readonly isReady: boolean;
}

export function useViewer(): Viewer {
	const [isReady, setIsReady] = React.useState(false);

	React.useEffect(() => {
		const loadComponents = async () => {
			await applyPolyfills();
			await defineCustomElements();
			setIsReady(true);
		};

		void loadComponents();
	}, []);

	return { ref: React.useRef<HTMLVertexViewerElement>(null), isReady };
}
