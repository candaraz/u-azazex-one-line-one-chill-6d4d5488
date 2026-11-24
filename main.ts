// One Line, One Chill — u-azazex-one-line-one-chill-6d4d5488
// Writes a single sentence of horror (101 characters, strictly one
// sentence) to $MAKEFUN_OUTPUT_DIR/entry.txt, with no trailing newline.
// Node 22, standard library only, zero network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I found my old diary from when I was nine, and the last entry, in my handwriting, describes tomorrow.";

// The gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace, and the entry must be strictly one sentence: exactly one
// period, the final character. Fail loudly rather than write a bad file.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if ((LINE.match(/\./g) || []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be strictly one sentence");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read it back and confirm the file is byte-identical to the line:
// no trailing newline, no transformation.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
console.log(`wrote ${outPath}`);
