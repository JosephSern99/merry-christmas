'use client';

import { useState } from 'react';
import LandingSection from '@/components/LandingSection';
import LoveLetterSection from '@/components/LoveLetterSection';
import TimelineSection from '@/components/TimelineSection';
import FinalSurpriseSection from '@/components/FinalSurpriseSection';
import MusicPlayer from '@/components/MusicPlayer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleCardOpen = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 2500);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-golden-light via-cream to-rosy-light overflow-hidden">
      <AnimatedBackground />
      <MusicPlayer />

      {!showContent ? (
        <LandingSection onCardOpen={handleCardOpen} />
      ) : (
        <div className="relative z-10">
          <LoveLetterSection />
          <TimelineSection />
          <FinalSurpriseSection />
        </div>
      )}
    </main>
  );
}
