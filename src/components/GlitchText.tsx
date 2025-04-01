
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  glitchInterval = 5000,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setIsGlitching(false);
      }, 500);
    }, glitchInterval);

    return () => clearInterval(glitchTimer);
  }, [glitchInterval]);

  return (
    <span
      className={cn(
        isGlitching && 'animate-glitch',
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default GlitchText;
