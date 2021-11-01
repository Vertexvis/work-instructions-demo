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
  clientId: "CEC52A15AF345F18D02AA4972D4D3CA12D10323E52572689204256E9A1024C40",
  streamKey: "VSFz3ChuRkGgYBMBhzKQh2Hvh9Sehh7QfDy0",
};
export const SceneId = "a2a5f9c5-738e-4241-af1b-d87c67e09faa";

function envVar(name: string, fallback: string): string {
  const ev = process.env[name];
  return ev ? ev : fallback;
}
