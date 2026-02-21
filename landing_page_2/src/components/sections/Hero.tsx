'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      
      {/* Background Layer 1: The Dynamic Floating Stars Canvas */}
      <ParticleBackground />

      {/* Background Layer 2: The Swirling Crescent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[800px] h-[600px] bg-[#814ac8] opacity-[0.25] blur-[120px] rounded-[100%] rotate-[-25deg] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[55%] w-[700px] h-[500px] bg-black opacity-[0.9] blur-[80px] rounded-[100%] rotate-[-25deg] pointer-events-none" />

      {/* Background Layer 3: 3D Animated Purple Orbits */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-15deg)', transformStyle: 'preserve-3d' }}>
        {/* Outer Orbit */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[900px] h-[900px] rounded-full border border-[#814ac8]/20 relative"
        >
          {/* Glowing Orbiting Dot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#814ac8] rounded-full shadow-[0_0_20px_4px_rgba(129,74,200,0.8)]" />
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotateX(70deg) rotateY(10deg)', transformStyle: 'preserve-3d' }}>
        {/* Inner Orbit (Spins opposite direction) */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="w-[650px] h-[650px] rounded-full border border-[#814ac8]/30 relative"
        >
          {/* Glowing Orbiting Dot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[1100px] mx-auto mt-10">
        
        {/* Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 p-1 pr-4 rounded-full border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(129,74,200,0.15)]"
        >
          <span className="px-3 py-1 text-xs font-semibold bg-[#814ac8] text-white rounded-full">New</span>
          <span className="text-sm text-gray-300 font-medium tracking-wide">Automated Lead Generation</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-[84px] font-semibold text-white tracking-tight mb-6 max-w-[1000px]"
          style={{ letterSpacing: '-2.8px', lineHeight: '1.05' }}
        >
          Intelligent Automation for Modern Businesses.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-[21px] text-[#a1a1aa] mb-10 max-w-2xl font-normal leading-relaxed"
        >
          Xtract brings AI automation to your fingertips & streamline tasks.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a 
            href="/contact" 
            className="flex items-center gap-2 px-6 py-3.5 bg-[#814ac8] hover:bg-[#915cd9] transition-all text-white font-medium rounded-lg shadow-[0_4px_40px_rgba(129,74,200,0.4)] hover:shadow-[0_4px_50px_rgba(129,74,200,0.6)]"
          >
            Get in touch <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
          <a 
            href="#services" 
            className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 transition-all text-white font-medium rounded-lg"
          >
            View services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
