"use client";

import { motion } from "framer-motion";

export function Hero() {
  // Staggered entrance physics
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 overflow-hidden">
      {/* 1. Perfect the Background: Fluid breathing animations using framer-motion */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#814ac8] blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -45, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#a855f7] blur-[100px] rounded-full pointer-events-none"
      />

      {/* Starry Particle Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, white 1px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. Add Physics: Container coordinates the cascading entrance */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="bg-[#814ac8]/10 border border-[#814ac8]/40 text-[#d8b4fe] px-4 py-1.5 rounded-full text-xs font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(129,74,200,0.3)]"
        >
          New
        </motion.div>

        {/* Headlines */}
        <motion.h1
          variants={item}
          className="font-semibold mb-6 text-white"
          style={{
            fontFamily: 'var(--font-figtree), sans-serif',
            fontSize: "56px",
            lineHeight: "61.6px",
            letterSpacing: "-2.2px",
          }}
        >
          Intelligent Automation for
          <br />
          Modern Businesses.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light"
        >
          Xtract brings AI automation to your fingertips & streamline tasks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-6 py-3 font-medium transition-colors flex items-center gap-2"
            style={{
              backgroundColor: "#814ac8",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "rgba(0, 0, 0, 0.15) 0px 0.706592px 0.706592px -0.625px, rgba(0, 0, 0, 0.145) 0px 1.80656px 1.80656px -1.25px, rgba(0, 0, 0, 0.137) 0px 3.62176px 3.62176px -1.875px, rgba(0, 0, 0, 0.125) 0px 6.8656px 6.8656px -2.5px, rgba(0, 0, 0, 0.106) 0px 13.6468px 13.6468px -3.125px, rgba(0, 0, 0, 0.05) 0px 30px 30px -3.75px",
            }}
          >
            Get in touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent hover:bg-white/5 border border-white/10 text-white px-6 py-3 rounded-[6px] font-medium transition-colors backdrop-blur-sm"
          >
            View services
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div variants={item} className="flex flex-col items-center gap-8">
          <p className="text-sm text-gray-500 font-medium tracking-wide">
            Over 50+ business trust us
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 font-bold text-xl text-white"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-sm" />
                </div>
                Logoipsum
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
