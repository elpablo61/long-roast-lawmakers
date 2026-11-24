// The Long Roast: Lawmakers and the File They Cannot Convert
// One satirical sentence, at most 320 characters. The program writes it
// to /output/entry.txt, where the sealed gate scorer reads it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The lawmaker drafting the bill to police the internet still emails his staff a screenshot of a Word document and asks them to make it a PDF.";

// The gate refuses anything over 320 characters, so fail loudly here
// instead of shipping an entry the judge never sees.
if (ENTRY.length > 320) {
  throw new Error(`entry is ${ENTRY.length} characters, over the 320 limit`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be blank");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
// The kit names /output/entry.txt outright, so always land a copy there
// even when the harness points MAKEFUN_OUTPUT_DIR elsewhere.
if (outDir !== "/output") {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}
console.log(ENTRY);
