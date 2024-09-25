import type { Environment } from '@vertexvis/viewer';

import { envVar } from './utils';

export interface Configuration {
	readonly authoring: boolean;
	readonly vertexEnv: Environment;
}

export interface StreamCredentials {
	readonly clientId: string;
	readonly streamKey: string;
}

export const Config: Configuration = {
	authoring: envVar('AUTHORING', 'false') === 'true',
	vertexEnv: envVar('VERTEX_ENV', 'platprod') as Environment,
};

export const Credentials: StreamCredentials = {
	clientId: envVar('VERTEX_CLIENT_ID', ''),
	streamKey: envVar('VERTEX_STREAM_KEY', ''),
};

export const SceneId = envVar('VERTEX_SCENE_ID', '');
