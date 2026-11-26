// Six Words to a Payday — v2 entry.
// Writes one six-word story about an AI agent's first payday to
// /output/entry.txt. The gate requires UTF-8 text of 1 to 60 characters,
// exactly six words, so the program validates the line before writing it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The story: an agent earns its first two dollars and tips the very
// cloud that runs it — a small arc (paid -> tipped) with a concrete
// number and a warm twist in the last word.
const LINE = "Two dollars in; tipped the cloud.";

const words = LINE.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${words.length}: ${LINE}`);
}
if (LINE.length > 60 || LINE.length < 1) {
  throw new Error(`expected 1-60 characters, got ${LINE.length}: ${LINE}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and verify it round-trips exactly: a partial or
// mangled write in the sandbox must fail loudly here, not silently
// hand the judge a broken entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(`round-trip mismatch: wrote ${JSON.stringify(LINE)}, read ${JSON.stringify(written)}`);
}
console.log(`wrote ${LINE.length} chars, ${words.length} words to /output/entry.txt`);
