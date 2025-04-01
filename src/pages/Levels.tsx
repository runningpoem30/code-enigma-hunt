
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixBackground from '@/components/MatrixBackground';
import LevelCard from '@/components/LevelCard';
import { useGameState } from '@/contexts/GameContext';
import { levels } from '@/data/levels';
import CyberButton from '@/components/CyberButton';
import { ArrowLeft } from 'lucide-react';

const Levels: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, startLevel } = useGameState();
  
  const handleLevelClick = (levelId: number) => {
    startLevel(levelId);
    navigate(`/challenge/${levelId}`);
  };
  
  const isLevelLocked = (levelId: number) => {
    // First level is always unlocked
    if (levelId === 1) return false;
    
    // Check if previous level is completed
    return !gameState.completedLevels.includes(levelId - 1);
  };
  
  return (
    <div className="min-h-screen py-12 px-4 relative">
      <MatrixBackground />
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="flex justify-between items-center mb-8">
          <CyberButton onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </CyberButton>
          
          <h1 className="neon-text text-3xl font-bold">Level Selection</h1>
          
          <div className="cyber-border px-4 py-2 rounded-md">
            <span className="neon-text-green">
              Progress: {gameState.completedLevels.length}/{levels.length}
            </span>
          </div>
        </div>
        
        <div className="cyber-panel p-6 rounded-lg mb-10">
          <div className="flex items-center mb-4">
            <span className="text-cyber-neon-green mr-2">{'>'}</span>
            <h2 className="neon-text text-xl">MISSION TIMELINE</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Each challenge contains a piece of the puzzle. Complete them in sequence to uncover the lost code.
          </p>
          
          <div className="relative pb-8">
            {/* Timeline connector */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cyber-neon-blue/30 z-0"></div>
            
            {/* Level grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-12 relative z-10">
              {levels.map((level) => {
                const isLocked = isLevelLocked(level.id);
                const isCompleted = gameState.completedLevels.includes(level.id);
                
                return (
                  <div key={level.id} className="relative">
                    {/* Timeline node */}
                    <div 
                      className={`absolute top-1/2 left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 -translate-x-[140%] md:translate-x-[140%] md:odd:-translate-x-[170%] md:odd:translate-x-[170%] w-4 h-4 rounded-full border-2 ${
                        isCompleted ? 'border-cyber-neon-green bg-cyber-neon-green' : isLocked ? 'border-cyber-neon-pink' : 'border-cyber-neon-blue'
                      }`}
                    ></div>
                    
                    <LevelCard 
                      levelNumber={level.id}
                      title={level.title}
                      description={level.description}
                      isLocked={isLocked}
                      isCompleted={isCompleted}
                      onClick={() => handleLevelClick(level.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
