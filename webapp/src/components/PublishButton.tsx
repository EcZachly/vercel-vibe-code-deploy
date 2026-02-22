"use client";

import { useState } from "react";

interface PublishButtonProps {
  postId: string;
  onPublished?: () => void;
}

export default function PublishButton({ postId, onPublished }: PublishButtonProps) {
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<{ message?: string; error?: string } | null>(null);

  async function handlePublish() {
    if (!confirm("Publish this post and send newsletter to all subscribers?")) return;

    setPublishing(true);
    setResult(null);

    try {
      const res = await fetch(`/api/posts/${postId}/publish`, {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ message: `${data.message} (${data.emailsSent} emails sent)` });
        onPublished?.();
      } else {
        setResult({ error: data.error });
      }
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handlePublish}
        disabled={publishing}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
      >
        {publishing ? "Publishing..." : "Publish & Send Newsletter"}
      </button>
      {result?.message && (
        <p className="text-green-400 text-sm">{result.message}</p>
      )}
      {result?.error && (
        <p className="text-red-400 text-sm">{result.error}</p>
      )}
    </div>
  );
}
