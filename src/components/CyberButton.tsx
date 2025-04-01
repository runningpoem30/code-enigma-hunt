
import React from 'react';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'blue' | 'pink' | 'green';
  disabled?: boolean;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'blue',
  disabled = false,
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'pink':
        return 'cyberpunk-button-pink';
      case 'green':
        return 'cyberpunk-button-green';
      case 'blue':
      default:
        return 'cyberpunk-button';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        getButtonClass(),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default CyberButton;
