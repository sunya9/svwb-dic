import type { Entry } from "../entries.ts";

export type FormatResult = {
  content: string | Uint8Array;
  rejected: Entry[];
};

export interface DictionaryFormat {
  readonly fileName: string;
  format(entries: Entry[]): FormatResult;
}
