import type { Environment } from '@vertexvis/viewer';

import { envVar } from './utils';

export interface Configuration {
	readonly vertexEnv: Environment;
}

export interface StreamCredentials {
	readonly clientId: string;
	readonly streamKey: string;
}

export const Config: Configuration = {
	vertexEnv: envVar('VERTEX_ENV', 'platprod') as Environment,
};

export const Credentials: StreamCredentials = {
	clientId: '08F675C4AACE8C0214362DB5EFD4FACAFA556D463ECA00877CB225157EF58BFA',
	streamKey: 'wzTRPxHgI8ylWKevQIDPA-GhL_8PhWwqLj4w',
};

export const SceneId = envVar('VERTEX_SCENE_ID', '');
