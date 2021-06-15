import { Environment } from "@vertexvis/viewer";

export interface StreamCredentials {
  readonly clientId: string;
  readonly streamKey: string;
}

// Super Car
export const SceneId = "2372b22a-2b38-4178-a4e3-e884e9f0bad9";
export const Credentials: StreamCredentials = {
  // clientId: "08F675C4AACE8C0214362DB5EFD4FACAFA556D463ECA00877CB225157EF58BFA",
  // streamKey: "2M8D6GttDum511RmQBsb3iw6qjj9HTFTC_GJ",
  clientId: "0670FB5312C6491905007BCCD3EF70FB12648EAC24BBDE8B76A1A4F1057B68D7",
  streamKey: "nac0DHFMNrjK4gYHnoF5Nb2RuJL88bJHb_7w",
};

export const Env =
  (process.env.NEXT_PUBLIC_VERTEX_ENV as Environment) || "platdev";
