import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "strong", "em", "del", "s",
  "img", "table", "thead", "tbody", "tr", "th", "td",
  "div", "span",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "cid"],
  code: ["class"],
  pre: ["class"],
  span: ["class"],
  div: ["class"],
  td: ["align"],
  th: ["align"],
};

export function sanitizeMarkdownHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "cid"],
    disallowedTagsMode: "discard",
  });
}

const MAX_EMAIL_SIZE_BYTES = 102400; // 100KB

export function validateEmailSize(content: string): { valid: boolean; size: number } {
  const size = Buffer.byteLength(content, "utf-8");
  return { valid: size <= MAX_EMAIL_SIZE_BYTES, size };
}
