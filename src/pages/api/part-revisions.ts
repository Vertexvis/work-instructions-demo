import { renderPartRevision } from "@vertexvis/api-client-node";
import { createWriteStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { createFile, errorRes, getClient } from "../../lib/vertex-api";

interface Body {
  readonly partRevisionId: string;
}

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
): Promise<void> {
  if (!req.body) return errorRes("Body required.", res);

  const b: Body = JSON.parse(req.body);
  if (!b.partRevisionId) return errorRes("Invalid body.", res);

  try {
    const renderRes = await renderPartRevision<NodeJS.ReadableStream>({
      client: await getClient(),
      onMsg: console.error,
      renderReq: {
        id: b.partRevisionId,
        height: 1080,
        width: 1080,
      },
      verbose: true,
    });

    const out = `./scripts/${b.partRevisionId}-orig.png`;
    renderRes.data.pipe(createWriteStream(out));
    await createFile(renderRes.data, out);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return errorRes("Unknown error.", res);
  }
}