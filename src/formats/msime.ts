import type { DictionaryFormat } from "./format.ts";

const BOM = Buffer.from([0xff, 0xfe]);

export const msImeFormat: DictionaryFormat = {
  fileName: "svwb-ms-ime.txt",
  format(entries) {
    const text = entries.map((e) => `${e.reading}\t${e.word}\t固有名詞\r\n`).join("");
    return { content: Buffer.concat([BOM, Buffer.from(text, "utf16le")]), rejected: [] };
  },
};
