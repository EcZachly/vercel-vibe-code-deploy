import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthor } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const authorId = searchParams.get("authorId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (authorId) where.authorId = authorId;

    const posts = await prisma.post.findMany({
      where,
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const author = await requireAuthor();

    const { title, contentMarkdown, isPaid } = await request.json();

    if (!contentMarkdown || typeof contentMarkdown !== "string") {
      return NextResponse.json(
        { error: "contentMarkdown is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: title || "Untitled",
        contentMarkdown,
        isPaid: isPaid || false,
        authorId: author.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
