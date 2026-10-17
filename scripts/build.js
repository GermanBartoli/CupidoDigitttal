import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");

rmSync(output, { recursive: true, force: true });
mkdirSync(output);

for (const file of ["index.html", "styles.css", "script.js", "_worker.js"]) {
  cpSync(join(root, file), join(output, file));
}
cpSync(join(root, "assets"), join(output, "assets"), { recursive: true });

console.log("Sitio preparado en dist/");
