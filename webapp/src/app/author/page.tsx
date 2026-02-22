"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import PostEditor from "@/components/PostEditor";
import PublishButton from "@/components/PublishButton";
import AuthButton from "@/components/AuthButton";
import type { User } from "@supabase/supabase-js";

interface Post {
  id: string;
  title: string;
  status: string;
  isPaid: boolean;
  emailSentAt: string | null;
  createdAt: string;
}

export default function AuthorPage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, [supabase]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-neutral-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Author Dashboard</h1>
        <p className="text-neutral-400 mb-8">
          Sign in to create and manage your blog posts.
        </p>
        <AuthButton />
      </div>
    );
  }

  if (creating) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">New Post</h1>
          <button
            onClick={() => setCreating(false)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>
        <PostEditor
          onSave={(post) => {
            setCreating(false);
            setEditing(post.id);
            fetchPosts();
          }}
        />
      </div>
    );
  }

  if (editing) {
    const post = posts.find((p) => p.id === editing);
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <button
            onClick={() => {
              setEditing(null);
              fetchPosts();
            }}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>
        <PostEditor
          postId={editing}
          initialTitle={post?.title}
          initialIsPaid={post?.isPaid}
          onSave={() => fetchPosts()}
        />
        {post?.status === "DRAFT" && (
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <PublishButton postId={editing} onPublished={() => {
              setEditing(null);
              fetchPosts();
            }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Author Dashboard</h1>
        <div className="flex items-center gap-4">
          <AuthButton />
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            + New Post
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-neutral-500 py-12">
          No posts yet. Create your first post!
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-white">
                  {post.title || "Untitled"}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      post.status === "PUBLISHED"
                        ? "bg-green-900/50 text-green-400"
                        : post.status === "ARCHIVED"
                        ? "bg-neutral-800 text-neutral-500"
                        : "bg-yellow-900/50 text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                  {post.isPaid && (
                    <span className="text-xs px-2 py-0.5 bg-amber-900/50 text-amber-400 rounded">
                      PAID
                    </span>
                  )}
                  {post.emailSentAt && (
                    <span className="text-xs text-neutral-500">
                      ✉️ Sent {new Date(post.emailSentAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setEditing(post.id)}
                className="px-3 py-1.5 text-sm border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
