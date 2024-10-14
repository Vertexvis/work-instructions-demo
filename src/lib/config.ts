import type { Environment } from '@vertexvis/viewer';

import { envVar } from './utils';

export interface Configuration {
	readonly vertexEnv: Environment;
}

export const Config: Configuration = {
	vertexEnv: envVar('VERTEX_ENV', 'platprod') as Environment,
};
