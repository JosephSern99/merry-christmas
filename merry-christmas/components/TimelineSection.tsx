'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ImageModal from './ImageModal';

// 13 pictures from the user's uploads
const pictures = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/images/${i + 1}.jpeg`,
  alt: `Memory ${i + 1}`,
}));

export default function TimelineSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Background color shift based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    ['#F4E4C1', '#E8B4B8', '#8B0000']
  );

  const scrollToImage = (index: number) => {
    const element = document.getElementById(`pic-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor }}
    >
      {/* Progress indicator with navigation */}
      <div className="sticky top-4 z-30 flex justify-center mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl border-4 border-gold">
          <div className="flex items-center gap-2">
            {pictures.map((pic, index) => (
              <button
                key={pic.id}
                onClick={() => scrollToImage(pic.id)}
                className="group relative"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-serif transition-colors ${
                    index === 0 ? 'bg-rose border-rose text-white' : 'bg-white border-golden-warmth text-golden-warmth hover:bg-golden-light'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {pic.id}
                </motion.div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {pic.id === 1 && '🌹'}
                  {pic.id === 13 && '🌷'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scrolling timeline */}
      <div className="overflow-x-auto pb-8 hide-scrollbar">
        <div className="flex gap-8 px-8 min-w-max">
          {pictures.map((picture, index) => (
            <motion.div
              key={picture.id}
              id={`pic-${picture.id}`}
              className="relative flex-shrink-0"
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.8 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Vintage frame */}
              <div className="relative p-6 bg-cream rounded-lg shadow-2xl border-8 border-golden-warmth">
                {/* Elegant numeral */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-christmas-red rounded-full flex items-center justify-center border-4 border-gold shadow-xl z-10">
                  <span className="font-serif text-2xl font-bold text-cream">
                    {picture.id}
                  </span>
                </div>

                {/* Picture */}
                <motion.div
                  className="relative w-80 h-80 sm:w-96 sm:h-96 bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(picture.id)}
                >
                  {/* Actual image */}
                  <Image
                    src={picture.src}
                    alt={picture.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 320px, 384px"
                  />

                  {/* Click to enlarge hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-serif">
                      Click to enlarge
                    </span>
                  </div>
                </motion.div>

                {/* Decorative corner elements */}
                <div className="absolute top-2 right-2 text-3xl opacity-40">
                  {index % 2 === 0 ? '🌹' : '🌷'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <ImageModal
          imageSrc={pictures[selectedImage - 1].src}
          imageAlt={pictures[selectedImage - 1].alt}
          imageNumber={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Scroll hint */}
      <div className="text-center mt-8 text-white font-serif animate-bounce">
        <p className="text-lg">← Scroll to explore our journey →</p>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
}
