import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import cardSets from "../data/card-sets.json" with { type: "json" };
import cards from "../data/cards.json" with { type: "json" };
import keywords from "../data/keywords.json" with { type: "json" };
import tribes from "../data/tribes.json" with { type: "json" };
import { DICTIONARY_FORMATS } from "./formats/index.ts";
import { generateDictionaries } from "./generate.ts";
import { toEntries } from "./words.ts";

const OUT_DIR = path.resolve("out");

async function main(): Promise<void> {
  const entries = toEntries({ card: cards, keyword: keywords, tribe: tribes, cardSet: cardSets });

  await mkdir(OUT_DIR, { recursive: true });
  await generateDictionaries(entries, DICTIONARY_FORMATS, (fileName, content) =>
    writeFile(path.join(OUT_DIR, fileName), content),
  );

  console.log(`wrote ${entries.length} entries to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
