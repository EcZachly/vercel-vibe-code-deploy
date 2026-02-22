import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr", "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "strong", "em", "del", "s",
  "img", "table", "thead", "tbody", "tr", "th", "td",
  "div", "span",
];

async function main() {
  const postId = process.argv[2];
  const testEmail = process.argv[3];

  if (!postId || !testEmail) {
    console.error("Usage: npx tsx scripts/send-post.ts <post-id> <test-email>");
    process.exit(1);
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    console.error(`Post not found: ${postId}`);
    process.exit(1);
  }

  const rawHtml = marked.parse(post.contentMarkdown, { async: false }) as string;
  const bodyHtml = sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_TAGS,
    allowedSchemes: ["http", "https", "mailto", "cid"],
  });

  const title = `[TEST] ${post.title || "Untitled"}`;

  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    .header { border-bottom: 1px solid #262626; padding-bottom: 24px; margin-bottom: 32px; }
    .header h1 { color: #ffffff; font-size: 28px; margin: 0; }
    .content { line-height: 1.7; font-size: 16px; }
    .content h1, .content h2, .content h3 { color: #ffffff; }
    .content a { color: #60a5fa; }
    .footer { border-top: 1px solid #262626; margin-top: 48px; padding-top: 24px; text-align: center; color: #737373; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>${title}</h1></div>
    <div class="content">${bodyHtml}</div>
    <div class="footer"><p>This is a test email. No unsubscribe link.</p></div>
  </div>
</body>
</html>`;

  console.log(`Sending test email to ${testEmail}...`);

  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "newsletter@example.com",
    to: testEmail,
    subject: title,
    html: emailHtml,
  });

  console.log("Email sent!", result);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
