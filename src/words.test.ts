import assert from "node:assert/strict";
import { test } from "node:test";
import { toEntries } from "./words.ts";

const empty = { card: [], keyword: [], tribe: [], cardSet: [] };

test("toEntries tags each word with its category in a fixed order", () => {
  const entries = toEntries({
    ...empty,
    cardSet: [{ word: "伝説の幕開け", reading: "でんせつのまくあけ" }],
    card: [{ word: "綺羅星", reading: "きらぼし" }],
    keyword: [{ word: "守護", reading: "しゅご" }],
  });
  assert.deepEqual(entries, [
    { reading: "きらぼし", word: "綺羅星", category: "card" },
    { reading: "しゅご", word: "守護", category: "keyword" },
    { reading: "でんせつのまくあけ", word: "伝説の幕開け", category: "cardSet" },
  ]);
});

test("toEntries rejects readings that contain anything other than hiragana", () => {
  const lists = {
    ...empty,
    card: [
      { word: "Mk-II", reading: "" },
      { word: "X", reading: "エックス" },
    ],
  };
  assert.throws(() => toEntries(lists), /Mk-II.*\n.*X/s);
});

test("toEntries rejects duplicate words across categories", () => {
  const lists = {
    ...empty,
    card: [{ word: "兵士", reading: "へいし" }],
    tribe: [{ word: "兵士", reading: "へいし" }],
  };
  assert.throws(() => toEntries(lists), /duplicate.*兵士/s);
});
