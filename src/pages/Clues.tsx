
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixBackground from '@/components/MatrixBackground';
import CyberButton from '@/components/CyberButton';
import { useGameState } from '@/contexts/GameContext';
import { levels } from '@/data/levels';
import { ArrowLeft, LockKeyhole, Trophy } from 'lucide-react';

const Clues: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGameState();
  
  const allLevelsCompleted = gameState.completedLevels.length === levels.length;
  
  return (
    <div className="min-h-screen py-12 px-4 relative">
      <MatrixBackground />
      
      <div className="max-w-5xl mx-auto z-10 relative">
        <div className="flex justify-between items-center mb-8">
          <CyberButton onClick={() => navigate('/levels')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Levels
          </CyberButton>
          
          <h1 className="neon-text text-3xl font-bold">Collected Clues</h1>
          
          <div className="cyber-border px-4 py-2 rounded-md">
            <span className="neon-text-green">
              {gameState.completedLevels.length}/{levels.length} Clues Found
            </span>
          </div>
        </div>
        
        <div className="cyber-panel p-6 rounded-lg mb-10">
          <div className="flex items-center mb-4">
            <span className="text-cyber-neon-green mr-2"></span>
            <h2 className="neon-text-pink text-xl">ENIGMA CLUE DATABASE</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            All recovered clues are stored here. Complete the remaining challenges to unlock all pieces of the puzzle.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {levels.map((level) => {
              const isCompleted = gameState.completedLevels.includes(level.id);
              const clue = gameState.collectedClues[level.id] || '';
              
              return (
                <div 
                  key={level.id} 
                  className={`cyber-panel p-4 rounded-md transition-all duration-300 ${
                    isCompleted ? 'border-cyber-neon-green' : 'border-cyber-dark-purple opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="neon-text text-sm">Clue #{level.id}</h3>
                    {isCompleted ? (
                      <span className="text-cyber-neon-green text-xs border border-cyber-neon-green rounded-full px-2 py-0.5">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="flex items-center text-cyber-neon-pink text-xs">
                        <LockKeyhole className="w-3 h-3 mr-1" />
                        LOCKED
                      </span>
                    )}
                  </div>
                  
                  <div className="h-16 flex items-center justify-center border border-cyber-neon-blue/20 rounded bg-cyber-dark-purple/30">
                    {isCompleted ? (
                      <span className="neon-text-green font-mono text-xl tracking-widest">
                        {clue}
                      </span>
                    ) : (
                      <span className="text-cyber-neon-blue/50">
                        ? ? ? ? ?
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Final Code Section */}
          <div className={`cyber-panel p-6 rounded-md ${
            allLevelsCompleted ? 'border-2 border-cyber-neon-green' : 'border border-cyber-neon-pink/50'
          }`}>
            <div className="flex items-center mb-4">
              <Trophy className={`mr-2 h-5 w-5 ${
                allLevelsCompleted ? 'text-cyber-neon-green' : 'text-gray-500'
              }`} />
              <h3 className={`text-xl ${
                allLevelsCompleted ? 'neon-text-green' : 'text-gray-400'
              }`}>
                Code Conspiracy
              </h3>
            </div>
            
            {allLevelsCompleted ? (
              <div className="animate-fade-in">
                <p className="text-gray-300 mb-4">
                  Congratulations! You've successfully recovered all clues and revealed the lost code of ENIGMA.
                </p>
                <div className="cyber-border p-4 rounded-md bg-cyber-dark-blue/50 text-center mb-6">
                  <span className="neon-text-green font-mono text-2xl tracking-widest">
                    THEENIGMACODEISHERE
                  </span>
                </div>
                <p className="text-cyber-neon-blue text-center">
                  You've proven yourself to be an exceptional code detective. Your skills have helped uncover one of the greatest secrets in cryptography.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  Complete all {levels.length} challenges to unlock the final secret.
                </p>
                <div className="inline-block cyber-border px-4 py-2 rounded-md">
                  <span className="text-cyber-neon-pink">
                    {gameState.completedLevels.length}/{levels.length} Clues Required
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center">
          <CyberButton 
            onClick={() => navigate('/levels')}
            variant={allLevelsCompleted ? "green" : "blue"}
          >
            {allLevelsCompleted ? "Mission Complete" : "Continue Mission"}
          </CyberButton>
        </div>
      </div>
    </div>
  );
};

export default Clues;
