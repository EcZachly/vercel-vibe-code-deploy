import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Subscription Active!</h1>
      <p className="text-neutral-400 mb-8">
        Thank you for subscribing! You now have access to all premium content.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
      >
        Browse Posts
      </Link>
    </div>
  );
}
