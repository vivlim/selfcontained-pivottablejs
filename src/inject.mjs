
import { promises as fs } from "node:fs";
import { createWriteStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const tabledataStart = Buffer.from('<script id="injectedData"');
const tabledataEnd = Buffer.from("</script>");

export async function inject (data, options, targetFilename){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pivotTableBase = await fs.open(resolve(__dirname, "..", "dist", "index.html"), 'r');
  const pivotTableBaseStream = pivotTableBase.createReadStream({autoClose: true});

  const dataToInject = {
    data: data,
    options: options,
  }

  const injectTransform = new TransformStream({
    transform(chunk, controller) {
      const startLocation = chunk.indexOf(tabledataStart)
      if (startLocation !== -1) {
        const endOfOpeningTag = chunk.indexOf(">", startLocation);
        if (endOfOpeningTag === -1){throw new Error("couldn't find > at start of injected data tag")}
        controller.enqueue(chunk.slice(0, endOfOpeningTag + 1));
        controller.enqueue(`\nwindow.injectedData = ${JSON.stringify(dataToInject)}\n`)
        const closeLocation = chunk.indexOf(tabledataEnd, endOfOpeningTag);
        controller.enqueue(chunk.slice(closeLocation));
      }
      else {
        controller.enqueue(chunk);
      }
    },
  })

  await pipeline(
    pivotTableBaseStream,
    injectTransform,
    await createWriteStream(targetFilename, {flags: 'w'})
  );
}