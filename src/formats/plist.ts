import type { DictionaryFormat } from "./format.ts";

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const textReplacementPlistFormat: DictionaryFormat = {
  fileName: "svwb-text-replacement.plist",
  format(entries) {
    const dicts = entries
      .map(
        (e) =>
          `\t<dict>\n\t\t<key>phrase</key>\n\t\t<string>${escapeXml(e.word)}</string>\n\t\t<key>shortcut</key>\n\t\t<string>${escapeXml(e.reading)}</string>\n\t</dict>\n`,
      )
      .join("");
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
${dicts}</array>
</plist>
`;
    return { content, rejected: [] };
  },
};
