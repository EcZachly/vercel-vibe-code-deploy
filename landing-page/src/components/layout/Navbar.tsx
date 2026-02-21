import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.05] backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-2">
        {/* Placeholder Logo Icon */}
        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center overflow-hidden relative">
           <div className="absolute top-0 right-0 w-3 h-3 bg-black rounded-bl-sm" />
           <div className="absolute bottom-0 left-0 w-3 h-3 bg-black rounded-tr-sm" />
        </div>
        <span className="text-xl font-bold tracking-wide text-white">XTRACT</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="#" className="text-white transition-colors">Home</Link>
        <Link href="#" className="hover:text-white transition-colors">About</Link>
        <Link href="#" className="hover:text-white transition-colors">Blog</Link>
        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
      </div>

      <div>
        <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
          Book a call
        </button>
      </div>
    </nav>
  );
}
