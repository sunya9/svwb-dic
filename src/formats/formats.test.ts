import assert from "node:assert/strict";
import { test } from "node:test";
import type { Entry } from "../entries.ts";
import { DICTIONARY_FORMATS } from "./index.ts";
import { googleImeFormat } from "./google.ts";
import { macosAdditionalDictionaryFormat } from "./kotoeri.ts";
import { msImeFormat } from "./msime.ts";
import { textReplacementPlistFormat } from "./plist.ts";

const entries: Entry[] = [
  { reading: "きらぼし", word: "綺羅星", category: "card" },
  { reading: "しゅご", word: "守護", category: "keyword" },
];

const asText = (content: string | Uint8Array) =>
  typeof content === "string" ? content : Buffer.from(content).toString("utf8");

test("DICTIONARY_FORMATS lists every format under a unique file name", () => {
  const names = DICTIONARY_FORMATS.map((f) => f.fileName);
  assert.equal(new Set(names).size, names.length);
  assert.equal(DICTIONARY_FORMATS.length, 4);
});

test("every format produces content for ordinary entries without rejecting any", () => {
  for (const f of DICTIONARY_FORMATS) {
    const { content, rejected } = f.format(entries);
    assert.ok(content.length > 0, f.fileName);
    assert.deepEqual(rejected, []);
  }
});

test("googleImeFormat writes tab separated lines with a proper noun part of speech and a comment", () => {
  assert.equal(
    googleImeFormat.format(entries).content,
    "きらぼし\t綺羅星\t固有名詞\tShadowverse: Worlds Beyond カード\nしゅご\t守護\t固有名詞\tShadowverse: Worlds Beyond キーワード\n",
  );
});

test("msImeFormat writes UTF-16LE with BOM and CRLF line endings", () => {
  const buf = Buffer.from(msImeFormat.format(entries).content);
  assert.deepEqual([buf[0], buf[1]], [0xff, 0xfe]);
  assert.equal(
    buf.subarray(2).toString("utf16le"),
    "きらぼし\t綺羅星\t固有名詞\r\nしゅご\t守護\t固有名詞\r\n",
  );
});

test("macosAdditionalDictionaryFormat writes comma separated lines with 普通名詞", () => {
  assert.equal(
    macosAdditionalDictionaryFormat.format(entries).content,
    "きらぼし,綺羅星,普通名詞\nしゅご,守護,普通名詞\n",
  );
});

test("macosAdditionalDictionaryFormat quotes words containing commas or spaces", () => {
  const { content } = macosAdditionalDictionaryFormat.format([
    { reading: "えい", word: "A, B", category: "card" },
  ]);
  assert.equal(content, 'えい,"A, B",普通名詞\n');
});

test("macosAdditionalDictionaryFormat rejects entries exceeding the reading or word length limits", () => {
  const long = { reading: "あ".repeat(33), word: "い".repeat(65), category: "card" as const };
  const { content, rejected } = macosAdditionalDictionaryFormat.format([long, ...entries]);
  assert.deepEqual(rejected, [long]);
  assert.ok(asText(content).startsWith("きらぼし"));
});

test("textReplacementPlistFormat writes an Apple text replacement plist with escaped XML", () => {
  const xml = asText(
    textReplacementPlistFormat.format([{ reading: "あんど", word: "A&B", category: "card" }])
      .content,
  );
  assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes("<key>phrase</key>\n\t\t<string>A&amp;B</string>"));
  assert.ok(xml.includes("<key>shortcut</key>\n\t\t<string>あんど</string>"));
  assert.ok(xml.trim().endsWith("</plist>"));
});
