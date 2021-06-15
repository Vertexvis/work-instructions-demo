import { readFileSync } from "fs";
import { basename, join } from "path";
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
    .toFile(join("scripts", `${basename(path)}-upd.png`));
}

Promise.all(["t1.png", "t2.png", "t3.png"].map((fn) => resize(fn)));
