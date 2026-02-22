import { marked } from "marked";
import matter from "gray-matter";
import { sanitizeMarkdownHtml } from "./sanitize";

export interface PostFrontmatter {
  title: string;
  excerpt?: string;
  heroImage?: string;
  date?: string;
  author?: string;
  isPaid?: boolean;
  tags?: string[];
}

export function parseMarkdown(raw: string): {
  frontmatter: PostFrontmatter;
  content: string;
} {
  const { data, content } = matter(raw);
  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function markdownToHtml(markdown: string): string {
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  return sanitizeMarkdownHtml(rawHtml);
}

export function buildEmailHtml(
  title: string,
  bodyHtml: string,
  unsubscribeUrl: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    .header { border-bottom: 1px solid #262626; padding-bottom: 24px; margin-bottom: 32px; }
    .header h1 { color: #ffffff; font-size: 28px; margin: 0; }
    .content { line-height: 1.7; font-size: 16px; }
    .content h1, .content h2, .content h3 { color: #ffffff; }
    .content a { color: #60a5fa; }
    .content code { background: #1e1e1e; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
    .content pre { background: #1e1e1e; padding: 16px; border-radius: 8px; overflow-x: auto; }
    .content blockquote { border-left: 3px solid #404040; margin-left: 0; padding-left: 16px; color: #a3a3a3; }
    .content img { max-width: 100%; height: auto; border-radius: 8px; }
    .footer { border-top: 1px solid #262626; margin-top: 48px; padding-top: 24px; text-align: center; color: #737373; font-size: 13px; }
    .footer a { color: #737373; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
    </div>
    <div class="content">
      ${bodyHtml}
    </div>
    <div class="footer">
      <p>You received this because you subscribed to our newsletter.</p>
      <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;
}
