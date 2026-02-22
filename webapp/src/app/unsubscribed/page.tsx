import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Unsubscribed</h1>
      <p className="text-neutral-400 mb-8">
        You have been successfully unsubscribed from our newsletter.
        You will no longer receive emails from us.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-block"
      >
        Return to Blog
      </Link>
    </div>
  );
}
