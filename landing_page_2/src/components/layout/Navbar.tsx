'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Replicated Logo */}
        <div className="relative w-7 h-7 bg-white rounded-md flex items-center justify-center overflow-hidden">
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-black rounded-tr-md flex items-center justify-center">
             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 translate-x-[1px] -translate-y-[1px]">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </div>
        <span className="text-white font-bold text-[22px] tracking-tight ml-1">XTRACT</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-[15px] text-[#a1a1aa] font-medium">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      
      <div>
        <Link href="/book" className="px-5 py-2.5 bg-[#814ac8] hover:bg-[#915cd9] transition-colors text-white text-[15px] font-medium rounded-lg">
          Book a call
        </Link>
      </div>
    </nav>
  );
}
