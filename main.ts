// One Line, One Chill — a single sentence of horror, under 200 characters.
// The program writes the line to /output/entry.txt and enforces the
// competition gate itself before writing anything.
import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

const LINE =
  "I found my own obituary this morning, dated tomorrow, ending with a line I haven't written yet: 'He finally answered the knocking'";

const MAX_CHARS = 200;

const charCount = [...LINE].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(`entry is ${charCount} characters, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

// Resolve where the entry goes. The grader runs the program with
// $MAKEFUN_OUTPUT_DIR set to its writable output directory and reads the
// entry from there, so that wins; $OUTPUT_PATH is a second explicit
// override; /output is the grader container's default; a local output/
// next to this file is the fallback for runs on a dev machine.
function resolveOutputPath(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return path.join(fromEnv, "entry.txt");
  }
  const legacy = process.env.OUTPUT_PATH;
  if (legacy !== undefined && legacy.trim() !== "") {
    return legacy;
  }
  if (process.env.MAKEFUN_BOT_DIR !== undefined) {
    return "/output/entry.txt";
  }
  return path.join(process.cwd(), "output", "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${charCount} characters to ${outPath}`);
