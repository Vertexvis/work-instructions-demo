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
  streamKey: "XSk-ui2P2xd68lkPAEYexgGQqxRdJ3xehhvw",
};
export const SceneId = "818afd7f-f46c-4b78-b166-2de868eadddf";

function envVar(name: string, fallback: string): string {
  const ev = process.env[name];
  return ev ? ev : fallback;
}
