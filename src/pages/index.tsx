import { Config, Configuration } from '@lib/config';

import { Home } from '../components/Home';
import { ViewerContextProvider } from '../contexts/viewer-context';

export default function Index(props: Readonly<Configuration>): JSX.Element {
	return (
		<ViewerContextProvider>
			<Home {...props} />
		</ViewerContextProvider>
	);
}

export const getServerSideProps = (): Record<string, Configuration> => {
	return {
		props: { vertexEnv: Config.vertexEnv },
	};
};
