import { readdirSync, readFileSync } from "fs";
import { dirname, extname, join } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const offset = 30;

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
  readdirSync(__dirname)
    .filter((f) => extname(f) === ".png")
    .map(resize)
);
