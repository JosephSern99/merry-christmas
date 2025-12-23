'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface ImageModalProps {
  imageSrc: string;
  imageAlt: string;
  imageNumber: number;
  onClose: () => void;
}

export default function ImageModal({ imageSrc, imageAlt, imageNumber, onClose }: ImageModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div
          className="relative w-full max-w-7xl max-h-[95vh] mx-4 bg-cream rounded-lg overflow-hidden shadow-2xl border-4 sm:border-8 border-gold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-christmas-red text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-christmas-crimson transition-colors shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image number badge */}
          <div className="absolute top-4 left-4 z-10 bg-christmas-red text-cream px-6 py-3 rounded-full font-serif text-xl font-bold border-4 border-gold shadow-lg">
            {imageNumber} of 13
          </div>

          {/* Image */}
          <div className="p-2 sm:p-4 md:p-8 flex items-center justify-center">
            <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 75vw"
                priority
                quality={95}
              />
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-16 right-16 text-4xl opacity-30">🌹</div>
          <div className="absolute bottom-16 left-16 text-4xl opacity-30">🌷</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
