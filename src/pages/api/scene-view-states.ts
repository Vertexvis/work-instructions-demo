import {
  isFailure,
  renderSceneView,
  SceneViewRelationshipDataTypeEnum,
} from "@vertexvis/api-client-node";
import { createWriteStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { SceneId } from "../../lib/env";
import {
  createFile,
  errorRes,
  getClient,
  makeCall,
} from "../../lib/vertex-api";

interface Body {
  readonly name: string;
  readonly sceneViewId: string;
}

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<{ readonly message: string }>
): Promise<void> {
  if (!req.body) return errorRes("Body required.", res);

  const b: Body = JSON.parse(req.body);
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

    const out = `./scripts/${svsRes.data.id}-orig.png`;
    renderRes.data.pipe(createWriteStream(out));
    await createFile(renderRes.data, out);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return errorRes("Unknown error.", res);
  }
}
