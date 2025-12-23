'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  type: 'petal' | 'snowflake';
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        type: i % 2 === 0 ? 'petal' : 'snowflake',
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${
            particle.type === 'petal' ? 'text-rose text-2xl' : 'text-white text-xl'
          }`}
          style={{
            left: `${particle.x}%`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(particle.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {particle.type === 'petal' ? '🌸' : '❄️'}
        </motion.div>
      ))}

      {/* Twinkling lights effect */}
      <div className="absolute top-0 left-0 right-0 h-20 border-t-4 border-gold opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-2 h-2 bg-gold rounded-full"
            style={{
              left: `${(i * 5)}%`,
              top: '10px',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
