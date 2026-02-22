import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          The Blog
        </h1>
        <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
          Thoughts on engineering, AI, and building great software.
          Subscribe to get new posts delivered to your inbox.
        </p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>

      <section className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-neutral-500 py-12">
            No posts yet. Check back soon!
          </p>
        ) : (
          posts.map((post) => {
            const excerpt = post.contentMarkdown.slice(0, 200);
            const excerptHtml = markdownToHtml(excerpt + "...");

            return (
              <article
                key={post.id}
                className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="flex items-center gap-3 mb-3">
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
                    {post.author?.name && (
                      <span className="text-sm text-neutral-500">
                        by {post.author.name}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                    {post.title || "Untitled"}
                  </h2>
                  <div
                    className="text-neutral-400 text-sm line-clamp-3 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: excerptHtml }}
                  />
                </Link>
              </article>
            );
          })
        )}
      </section>

      <section className="mt-16 text-center border-t border-neutral-800 pt-12">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-neutral-400 mb-6">
          Get the latest posts delivered directly to your inbox.
        </p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
