export const stripHtml = (html: string): string => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
};

export const getExcerptFromHtml = (html: string, maxLength = 200): string => {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

