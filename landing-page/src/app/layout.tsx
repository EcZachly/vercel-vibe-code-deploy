import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: "Xtract Clone",
  description: "Visual-first clone of the Xtract template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${figtree.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
