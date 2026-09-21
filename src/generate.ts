import type { Entry } from "./entries.ts";
import type { DictionaryFormat } from "./formats/format.ts";

export type FileWriter = (fileName: string, content: string | Uint8Array) => Promise<void>;

export async function generateDictionaries(
  entries: Entry[],
  formats: readonly DictionaryFormat[],
  write: FileWriter,
): Promise<void> {
  const results = formats.map((f) => ({ fileName: f.fileName, ...f.format(entries) }));

  const rejections = results.flatMap((r) => r.rejected.map((e) => `  ${r.fileName}: ${e.word}`));
  if (rejections.length > 0) {
    throw new Error(`entries rejected by a format:\n${rejections.join("\n")}`);
  }

  for (const r of results) {
    await write(r.fileName, r.content);
  }
}
