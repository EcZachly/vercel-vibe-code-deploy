import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import SubscribeForm from "@/components/SubscribeForm";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const html = markdownToHtml(post.contentMarkdown);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8 border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-3 mb-4">
            {post.isPaid && (
              <span className="px-2 py-0.5 bg-amber-900/50 text-amber-400 text-xs font-medium rounded">
                PREMIUM
              </span>
            )}
            <time className="text-sm text-neutral-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {post.title || "Untitled"}
          </h1>
          {post.author?.name && (
            <p className="text-neutral-400">by {post.author.name}</p>
          )}
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-a:text-blue-400
            prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
            prose-blockquote:border-neutral-700 prose-blockquote:text-neutral-400
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <section className="mt-16 border-t border-neutral-800 pt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Enjoyed this post?</h2>
        <p className="text-neutral-400 mb-6">
          Subscribe to get notified when new posts are published.
        </p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
