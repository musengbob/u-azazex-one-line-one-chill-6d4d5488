// One Line, One Chill — a single sentence of horror, under 200 characters.
// The program writes the line to /output/entry.txt and enforces the
// competition gate itself before writing anything.
import { mkdirSync, writeFileSync } from "node:fs";

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

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${charCount} characters to /output/entry.txt`);
