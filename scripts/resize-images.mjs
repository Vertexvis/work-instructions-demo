import { readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const offset = 205;

async function resize(path) {
  const image = sharp(readFileSync(join("scripts", path)));
  const metadata = await image.metadata();
  await image
    .extract({
      left: offset,
      top: offset,
      width: metadata.width - offset,
      height: metadata.height - offset,
    })
    .toFile(join("scripts", `${path.replace("-orig", "")}`));
}

Promise.all(
  [
    "e57ad094-0103-487e-b377-eced7619991e-orig.png",
    "dbf5540f-56e3-4434-95cb-ae51d8725f06-orig.png",
    "58b7c10d-49c6-4baa-8b5e-f2f3d738597b-orig.png",
  ].map((fn) => resize(fn))
);
