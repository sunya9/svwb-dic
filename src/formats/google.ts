import type { DictionaryFormat } from "./format.ts";
import { CATEGORY_LABELS } from "./labels.ts";

export const googleImeFormat: DictionaryFormat = {
  fileName: "svwb-google-ime.txt",
  format(entries) {
    const content = entries
      .map((e) => `${e.reading}\t${e.word}\t固有名詞\t${CATEGORY_LABELS[e.category]}\n`)
      .join("");
    return { content, rejected: [] };
  },
};
