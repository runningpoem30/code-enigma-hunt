
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, INITIAL_GAME_STATE } from '@/types/game';
import { levels } from '@/data/levels';

interface GameContextType {
  gameState: GameState;
  startLevel: (levelId: number) => void;
  completeLevel: (levelId: number) => void;
  addClue: (levelId: number, clue: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load from localStorage
    const savedState = localStorage.getItem('enigmaGameState');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Error parsing saved game state:', e);
      }
    }
    return { ...INITIAL_GAME_STATE, totalLevels: levels.length };
  });

  // Save to localStorage when gameState changes
  useEffect(() => {
    localStorage.setItem('enigmaGameState', JSON.stringify(gameState));
  }, [gameState]);

  const startLevel = (levelId: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: levelId
    }));
  };

  const completeLevel = (levelId: number) => {
    setGameState(prev => {
      // Only add to completed levels if not already there
      if (!prev.completedLevels.includes(levelId)) {
        return {
          ...prev,
          completedLevels: [...prev.completedLevels, levelId].sort((a, b) => a - b)
        };
      }
      return prev;
    });
  };

  const addClue = (levelId: number, clue: string) => {
    setGameState(prev => ({
      ...prev,
      collectedClues: { ...prev.collectedClues, [levelId]: clue }
    }));
  };

  const resetGame = () => {
    setGameState({ ...INITIAL_GAME_STATE, totalLevels: levels.length });
  };

  return (
    <GameContext.Provider value={{ gameState, startLevel, completeLevel, addClue, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}
