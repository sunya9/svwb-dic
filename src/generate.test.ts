import assert from "node:assert/strict";
import { test } from "node:test";
import type { Entry } from "./entries.ts";
import type { DictionaryFormat } from "./formats/format.ts";
import { generateDictionaries } from "./generate.ts";

const entries: Entry[] = [{ reading: "きらぼし", word: "綺羅星", category: "card" }];
const ok: DictionaryFormat = {
  fileName: "ok.txt",
  format: () => ({ content: "ok", rejected: [] }),
};
const picky: DictionaryFormat = {
  fileName: "picky.txt",
  format: (e) => ({ content: "", rejected: e }),
};

test("generateDictionaries writes one file per format", async () => {
  const written: Record<string, string | Uint8Array> = {};
  await generateDictionaries(
    entries,
    [ok, { ...ok, fileName: "ok2.txt" }],
    async (name, content) => {
      written[name] = content;
    },
  );
  assert.deepEqual(written, { "ok.txt": "ok", "ok2.txt": "ok" });
});

test("generateDictionaries throws naming every rejected entry and writes nothing", async () => {
  const written: string[] = [];
  await assert.rejects(
    generateDictionaries(entries, [ok, picky], async (name) => {
      written.push(name);
    }),
    /picky\.txt.*綺羅星/s,
  );
  assert.deepEqual(written, []);
});
