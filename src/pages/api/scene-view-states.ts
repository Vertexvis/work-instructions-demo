import {
  isFailure,
  renderSceneView,
  SceneViewRelationshipDataTypeEnum,
} from "@vertexvis/api-client-node";
import { createWriteStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { SceneId } from "../../lib/env";
import { getClient, makeCall } from "../../lib/vertex-api";

interface Body {
  name: string;
  sceneViewId: string;
}

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
): Promise<void> {
  if (!req.body) return errorRes("Body required.", res);

  const b: Body = JSON.parse(req.body);
  console.log(b);
  if (!b.name || !b.sceneViewId) return errorRes("Invalid body.", res);

  try {
    const svsRes = await makeCall((client) =>
      client.sceneViewStates.createSceneViewState({
        id: SceneId,
        createSceneViewStateRequest: {
          data: {
            type: "scene-view-state",
            attributes: { name: b.name },
            relationships: {
              sceneView: {
                data: {
                  type: SceneViewRelationshipDataTypeEnum.SceneView,
                  id: b.sceneViewId,
                },
              },
            },
          },
        },
      })
    );
    if (isFailure(svsRes)) return errorRes("Unknown error.", res);

    const renderRes = await renderSceneView<NodeJS.ReadableStream>({
      client: await getClient(),
      onMsg: console.error,
      renderReq: {
        id: b.sceneViewId,
        height: 1080,
        width: 1080,
      },
      verbose: true,
    });

    const out = `${svsRes.data.id}.jpg`;
    renderRes.data.pipe(createWriteStream(out));
    await createFile(renderRes.data, out);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return errorRes("Unknown error.", res);
  }
}

function errorRes(
  message: string,
  res: NextApiResponse<{ message: string }>
): Promise<void> {
  return Promise.resolve(res.status(400).json({ message }));
}

function createFile(
  stream: NodeJS.ReadableStream,
  path: string
): Promise<void> {
  return new Promise((resolve) => {
    const ws = createWriteStream(path);
    stream.pipe(ws);
    ws.on("finish", resolve);
  });
}
