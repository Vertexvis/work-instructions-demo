import { Environment } from "@vertexvis/viewer";

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
  // clientId: "0670FB5312C6491905007BCCD3EF70FB12648EAC24BBDE8B76A1A4F1057B68D7",
  // streamKey: "nac0DHFMNrjK4gYHnoF5Nb2RuJL88bJHb_7w",
};
export const SceneId = "818afd7f-f46c-4b78-b166-2de868eadddf";
// export const SceneId = "2372b22a-2b38-4178-a4e3-e884e9f0bad9";

function envVar(name: string, fallback: string): string {
  const ev = process.env[name];
  return ev ? ev : fallback;
}
