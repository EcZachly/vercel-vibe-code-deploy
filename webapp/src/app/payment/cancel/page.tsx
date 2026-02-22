import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-neutral-400 mb-8">
        Your payment was cancelled. You can try again anytime.
      </p>
      <Link
        href="/payment/manage"
        className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-block"
      >
        Try Again
      </Link>
    </div>
  );
}
