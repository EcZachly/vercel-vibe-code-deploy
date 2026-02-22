import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthor } from "@/lib/auth";
import { resend } from "@/lib/resend";
import { markdownToHtml, buildEmailHtml } from "@/lib/markdown";
import { validateEmailSize } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const author = await requireAuthor();
    const { id } = await params;

    const rateLimitResult = rateLimit(`author:${author.id}:send`, 1, 86400000);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Authors can only send one newsletter per day.",
          resetIn: Math.ceil(rateLimitResult.resetIn / 1000),
        },
        { status: 429 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.authorId !== author.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (post.emailSentAt) {
      return NextResponse.json(
        { error: "Newsletter already sent for this post" },
        { status: 409 }
      );
    }

    const bodyHtml = markdownToHtml(post.contentMarkdown);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const sizeCheck = validateEmailSize(bodyHtml);
    if (!sizeCheck.valid) {
      return NextResponse.json(
        {
          error: `Post content exceeds maximum email size (${Math.round(sizeCheck.size / 1024)}KB / 100KB limit)`,
        },
        { status: 413 }
      );
    }

    const subscribers = await prisma.subscriber.findMany({
      where: { status: "ACTIVE" },
    });

    if (subscribers.length === 0) {
      await prisma.post.update({
        where: { id },
        data: {
          status: "PUBLISHED",
          publishedAt: new Date(),
        },
      });
      return NextResponse.json({
        message: "Post published but no active subscribers to email",
        emailsSent: 0,
      });
    }

    const title = post.title || "New Blog Post";
    let sentCount = 0;

    for (const subscriber of subscribers) {
      if (post.isPaid) {
        // Skip free subscribers for paid posts (Stripe integration needed)
        continue;
      }

      const unsubscribeUrl = `${appUrl}/api/subscribers/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
      const emailHtml = buildEmailHtml(title, bodyHtml, unsubscribeUrl);

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "newsletter@example.com",
        to: subscriber.email,
        subject: title,
        html: emailHtml,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
        },
      });

      sentCount++;
    }

    await prisma.post.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
        emailSentAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Post published and newsletter sent",
      emailsSent: sentCount,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
