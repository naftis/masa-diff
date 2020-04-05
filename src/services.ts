import TurndownService from "turndown";
import DiffCalculator from "text-diff";

export function getDomainName(url: string) {
  return url
    .match(/\/\/(.+)\/?/)?.[1]
    .replace(/\./g, "\\.")
    .replace(/-/g, "\\-");
}

export function htmlToMarkdown(htmlBody: string) {
  const turndownService = new TurndownService();
  return turndownService.turndown(htmlBody);
}

export function getAddition(oldContent: string, newContent: string) {
  const difference = new DiffCalculator();
  const textDiff: [0 | 1 | -1, string][] = difference.main(
    oldContent,
    newContent
  );

  const diff = textDiff.reduce((prev, curr) => {
    if (curr[0] === 1) {
      return prev + curr[1];
    }

    return prev;
  }, "");

  if (diff === "") {
    return null;
  }

  return diff;
}
