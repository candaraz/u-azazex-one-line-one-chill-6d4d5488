import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve every path from this script's own directory so the program
// behaves identically no matter where it is launched from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const entryText = readFileSync(entryPath, "utf8");

// The grader names the destination through MAKEFUN_OUTPUT_DIR. Create the
// directory when it is missing, clear out only what is inside it (the
// directory itself must stay in place), then drop in a byte-exact copy.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}
writeFileSync(join(outputDir, "entry.txt"), entryText);
