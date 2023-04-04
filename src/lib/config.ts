import type { Environment } from "@vertexvis/viewer";

export interface Configuration {
  readonly authoring: boolean;
  readonly vertexEnv: Environment;
}

export interface StreamCredentials {
  readonly clientId: string;
  readonly streamKey: string;
}

export const Config: Configuration = {
  authoring: envVar("AUTHORING", "false") === "true",
  vertexEnv: envVar("VERTEX_ENV", "platprod") as Environment,
};

// Super Car
export const Credentials: StreamCredentials = {
  clientId: "08F675C4AACE8C0214362DB5EFD4FACAFA556D463ECA00877CB225157EF58BFA",
  streamKey: "ocgUAlbpe5dWkOjkHjUWzv7Sm1qWJpTi9sa4",
};
export const SceneId = "421a79ac-9b12-49b1-b517-4d6760b3c9f8";

function envVar(name: string, fallback: string): string {
  const ev = process.env[name];
  return ev ? ev : fallback;
}

export function head<T>(items?: T | T[]): T | undefined {
  return Array.isArray(items) ? items[0] : items ?? undefined;
}
