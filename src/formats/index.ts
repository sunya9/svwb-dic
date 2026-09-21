import type { DictionaryFormat } from "./format.ts";
import { googleImeFormat } from "./google.ts";
import { macosAdditionalDictionaryFormat } from "./kotoeri.ts";
import { msImeFormat } from "./msime.ts";
import { textReplacementPlistFormat } from "./plist.ts";

export const DICTIONARY_FORMATS: readonly DictionaryFormat[] = [
  googleImeFormat,
  msImeFormat,
  macosAdditionalDictionaryFormat,
  textReplacementPlistFormat,
];
