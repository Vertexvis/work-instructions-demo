import type { Environment } from '@vertexvis/viewer';

export interface Configuration {
	readonly authoring: boolean;
	readonly vertexEnv: Environment;
}

export interface StreamCredentials {
	readonly clientId: string;
	readonly streamKey: string;
}

export const Config: Configuration = {
	authoring: envVar('VERTEX_AUTHORING', 'false') === 'true',
	vertexEnv: envVar('VERTEX_ENV', 'platprod') as Environment,
};

export const Credentials: StreamCredentials = {
	clientId: '08F675C4AACE8C0214362DB5EFD4FACAFA556D463ECA00877CB225157EF58BFA',
	streamKey: 'wzTRPxHgI8ylWKevQIDPA-GhL_8PhWwqLj4w',
};

export const SceneId = envVar('VERTEX_SCENE_ID', '');

function envVar(name: string, fallback: string): string {
	const ev = process.env[name];
	return ev ?? fallback;
}
