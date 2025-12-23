'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalSurpriseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #8B0000 0%, #C41E3A 50%, #8B0000 100%)',
      }}
    >
      {/* Golden accents */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-40">🌹</div>
      <div className="absolute top-10 right-10 text-6xl opacity-40">🌷</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-40">🌷</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-40">🌹</div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Ornate border */}
        <div className="absolute inset-0 border-8 border-gold rounded-lg opacity-70 -z-10"></div>
        <div className="absolute inset-2 border-4 border-golden-warmth rounded-lg -z-10"></div>

        {/* Content */}
        <div className="bg-cream/95 backdrop-blur-sm p-12 sm:p-16 rounded-lg shadow-2xl">
          {/* Celebrating Kayla */}
          <motion.div
            className="font-handwritten text-2xl sm:text-3xl text-gray-800 leading-relaxed space-y-6"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            <p className="text-center text-4xl sm:text-5xl mb-8 text-christmas-red">
              Celebrating You, Kayla
            </p>

            <p className="text-center">
              I admire the woman you are - dedicated to your work, cherishing your friends,
              growing beautifully in your faith as a woman of God, and serving your community
              with such a loving heart.
            </p>

            <p className="text-center">
              You inspire me every day with your passion, your purpose, and your unwavering love for God.
              Your light shines brightly, and I'm blessed to walk alongside you.
            </p>

            {/* Merry Christmas message */}
            <motion.div
              className="text-center mt-12 pt-8 border-t-2 border-gold"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <p className="text-5xl sm:text-6xl font-bold text-christmas-red mb-4">
                Merry Christmas
              </p>
              <div className="flex justify-center gap-4 text-5xl">
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎄
                </motion.span>
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ❤️
                </motion.span>
                <motion.span
                  animate={{
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎁
                </motion.span>
              </div>
            </motion.div>

            {/* Signature */}
            <div className="text-right text-2xl sm:text-3xl mt-12 italic text-christmas-crimson">
              With all my love,<br />
              Your man ❤️
            </div>
          </motion.div>
        </div>

        {/* Final decorative element */}
        <motion.div
          className="text-center mt-8 text-cream text-xl font-serif"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨ Forever and always ✨
        </motion.div>
      </motion.div>
    </section>
  );
}
