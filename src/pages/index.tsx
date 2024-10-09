import { Config, Configuration } from '@lib/config';

import { Home } from '../components/Home';

export default function Index(props: Readonly<Configuration>): JSX.Element {
	return <Home {...props} />;
}

export const getServerSideProps = (): Record<string, Configuration> => {
	return {
		props: { vertexEnv: Config.vertexEnv },
	};
};
