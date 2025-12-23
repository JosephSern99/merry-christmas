'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface LandingSectionProps {
  onCardOpen: () => void;
}

export default function LandingSection({ onCardOpen }: LandingSectionProps) {
  useEffect(() => {
    onCardOpen();
  }, [onCardOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-gradient-to-br from-christmas-red/20 via-golden-warmth/30 to-rosy-pink/20">
      {/* Card opening animation */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {/* Left card door */}
        <motion.div
          className="absolute w-1/2 h-full bg-gradient-to-r from-christmas-red to-christmas-crimson border-r-4 border-gold origin-left"
          style={{
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -90 }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-cream p-8">
              <div className="font-serif text-6xl mb-4">🎄</div>
              <h1 className="font-handwritten text-5xl">Merry</h1>
            </div>
          </div>
        </motion.div>

        {/* Right card door */}
        <motion.div
          className="absolute w-1/2 right-0 h-full bg-gradient-to-l from-christmas-red to-christmas-crimson border-l-4 border-gold origin-right"
          style={{
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 90 }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-cream p-8">
              <h1 className="font-handwritten text-5xl mb-4">Christmas</h1>
              <div className="font-serif text-6xl">❤️</div>
            </div>
          </div>
        </motion.div>

        {/* Center reveal - Kayla's name */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
        >
          <div className="text-center">
            <motion.h1
              className="font-handwritten text-8xl text-christmas-red mb-4"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Kayla
            </motion.h1>
            <motion.div
              className="text-4xl"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🌹
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
