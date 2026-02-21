import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#814ac8] selection:text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
