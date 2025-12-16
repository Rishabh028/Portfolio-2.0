import { motion } from 'framer-motion';

interface MarqueeTextProps {
  words: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export const MarqueeText = ({ 
  words, 
  direction = 'left', 
  speed = 30,
  className = ''
}: MarqueeTextProps) => {
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === 'left' ? ['0%', '-25%'] : ['-25%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {repeatedWords.map((word, index) => (
          <span
            key={index}
            className="mx-4 text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.3)',
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
