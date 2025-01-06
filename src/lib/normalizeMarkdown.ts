export const normalizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, "    ")
    .replace(/`{4,}/g, "```")
    .replace(/(\S)`(\S)/g, "$1` $2")
    .replace(/^\s*'/gm, "")
    .replace(/'/g, "")
    .replace(/ {2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
