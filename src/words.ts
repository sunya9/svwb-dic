import type { Category, Entry } from "./entries.ts";

export type Word = { word: string; reading: string };
export type WordLists = Record<Category, Word[]>;

const CATEGORY_ORDER: readonly Category[] = ["card", "keyword", "tribe", "cardSet"];
const VALID_READING = /^[ぁ-ゖー]+$/;

export function toEntries(lists: WordLists): Entry[] {
  const entries = CATEGORY_ORDER.flatMap((category) =>
    lists[category].map((w) => ({ reading: w.reading, word: w.word, category })),
  );

  const invalid = entries.filter((e) => !VALID_READING.test(e.reading));
  if (invalid.length > 0) {
    throw new Error(
      `invalid readings:\n${invalid.map((e) => `  ${e.word}: "${e.reading}"`).join("\n")}`,
    );
  }

  const seen = new Set<string>();
  const duplicates = entries.filter((e) => seen.has(e.word) || (seen.add(e.word), false));
  if (duplicates.length > 0) {
    throw new Error(`duplicate words:\n${duplicates.map((e) => `  ${e.word}`).join("\n")}`);
  }

  return entries;
}
