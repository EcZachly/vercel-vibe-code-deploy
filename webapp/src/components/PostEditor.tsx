"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialIsPaid?: boolean;
  postId?: string;
  onSave?: (post: { id: string }) => void;
}

export default function PostEditor({
  initialTitle = "",
  initialContent = "",
  initialIsPaid = false,
  postId,
  onSave,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, contentMarkdown: content, isPaid }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      const post = await res.json();
      onSave?.(post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title..."
        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xl font-semibold placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-neutral-300">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="rounded border-neutral-600 bg-neutral-800 text-blue-600 focus:ring-blue-500"
          />
          Paid content
        </label>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 text-sm border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {preview ? (
        <div className="prose prose-invert max-w-none p-6 bg-neutral-900 border border-neutral-700 rounded-lg min-h-[400px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post in Markdown..."
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[400px] font-mono text-sm resize-y"
        />
      )}
    </div>
  );
}
