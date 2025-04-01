
import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Check } from 'lucide-react';
import CyberButton from './CyberButton';

interface LevelCardProps {
  levelNumber: number;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
  className?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({
  levelNumber,
  title,
  description,
  isLocked,
  isCompleted,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'cyber-panel p-4 rounded-md relative transition-all duration-300',
        isLocked ? 'opacity-60 grayscale' : 'hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]',
        isCompleted ? 'border-cyber-neon-green' : '',
        className
      )}
    >
      <div className="absolute top-3 right-3">
        {isLocked ? (
          <Lock className="text-cyber-neon-pink w-5 h-5" />
        ) : isCompleted ? (
          <Check className="text-cyber-neon-green w-5 h-5" />
        ) : null}
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full cyber-border flex items-center justify-center">
          <span className="neon-text font-bold">{levelNumber}</span>
        </div>
        <h3 className="neon-text text-lg">{title}</h3>
      </div>

      <p className="text-gray-300 text-sm mb-4">{description}</p>

      <CyberButton
        onClick={onClick}
        disabled={isLocked}
        variant={isCompleted ? 'green' : 'blue'}
        className="w-full"
      >
        {isLocked ? 'Locked' : isCompleted ? 'Replay' : 'Start'}
      </CyberButton>
    </div>
  );
};

export default LevelCard;
