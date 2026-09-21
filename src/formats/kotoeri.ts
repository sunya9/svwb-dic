import type { Entry } from "../entries.ts";
import type { DictionaryFormat } from "./format.ts";

const MAX_READING_LENGTH = 32;
const MAX_WORD_LENGTH = 64;

function quote(field: string): string {
  if (!/[,\s"]/.test(field)) return field;
  return `"${field.replace(/"/g, '""')}"`;
}

export const macosAdditionalDictionaryFormat: DictionaryFormat = {
  fileName: "svwb-macos-additional.txt",
  format(entries) {
    const rejected: Entry[] = [];
    const lines: string[] = [];
    for (const e of entries) {
      if (e.reading.length > MAX_READING_LENGTH || e.word.length > MAX_WORD_LENGTH) {
        rejected.push(e);
        continue;
      }
      lines.push(`${e.reading},${quote(e.word)},普通名詞\n`);
    }
    return { content: lines.join(""), rejected };
  },
};
