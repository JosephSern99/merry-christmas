'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function LoveLetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #F4E4C1 0%, #FFFDD0 100%)',
      }}
    >
      {/* Decorative roses in corners */}
      <div className="absolute top-10 left-10 text-6xl opacity-30">🌹</div>
      <div className="absolute top-10 right-10 text-6xl opacity-30">🌹</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-30">🌷</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-30">🌷</div>

      <motion.div
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Ornate border */}
        <div className="absolute inset-0 border-8 border-gold rounded-lg opacity-50 -z-10"></div>
        <div className="absolute inset-2 border-4 border-golden-warmth rounded-lg -z-10"></div>

        {/* Letter content */}
        <div className="bg-cream/90 backdrop-blur-sm p-12 sm:p-16 rounded-lg shadow-2xl relative">
          {/* Wax seal */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-christmas-red w-20 h-20 rounded-full flex items-center justify-center border-4 border-gold shadow-xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          >
            <span className="text-cream font-serif text-xs font-bold">
              Sealed<br />with<br />Love
            </span>
          </motion.div>

          {/* Letter text with grow animation */}
          <motion.div
            className="font-handwritten text-2xl sm:text-3xl text-gray-800 leading-relaxed space-y-6"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
          >
            <p className="text-center text-3xl sm:text-4xl mb-8 text-christmas-red">
              To my dear Kayla,
            </p>

            <p>
              Words can't describe how much I love you in all the months we dated together.
              You are truly Heaven's treasure, and the prayer that God has answered me back from 2022.
              I truly want to journey with you through the ups and downs of life. I never regretted
              any decisions I make when I asked to be your man.
            </p>

            <p className="italic text-christmas-crimson">
              When we fail, always come back to remember Jesus was sent from heaven to us as a gift,
              and that gift of grace and mercy was the kindest gift in the past, present, and future.
            </p>

            <p className="text-center text-3xl sm:text-4xl mt-8">
              I love you with all of my heart.
            </p>

            {/* Decorative hearts */}
            <div className="flex justify-center gap-4 mt-8 text-4xl">
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                ❤️
              </motion.span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.5,
                }}
              >
                💕
              </motion.span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 1,
                }}
              >
                ❤️
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
