
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatrixBackground from '@/components/MatrixBackground';
import TypingText from '@/components/TypingText';
import CyberButton from '@/components/CyberButton';
import GlitchText from '@/components/GlitchText';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/contexts/GameContext';
import { Terminal, Lock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [showBrief, setShowBrief] = useState(false);
  const { toast } = useToast();
  const { gameState } = useGameState();
  const progress = gameState.completedLevels.length;

  useEffect(() => {
    const introSound = new Audio('/typing.mp3');
    introSound.volume = 0.2;
    
    // Simulate typing sound
    const typingInterval = setInterval(() => {
      introSound.currentTime = 0;
      introSound.play().catch(() => {
        // Silent error for browsers that block autoplay
      });
    }, 200);
    
    const timeout = setTimeout(() => {
      setShowBrief(true);
      clearInterval(typingInterval);
    }, 2000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(typingInterval);
      introSound.pause();
    };
  }, []);

  const handleStartMission = () => {
    const successSound = new Audio('/success.mp3');
    successSound.volume = 0.3;
    successSound.play().catch(() => {
      // Silent error for browsers that block autoplay
    });
    
    toast({
      title: "Mission Briefing Complete",
      description: "Access granted to Level Selection",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-4">
      <MatrixBackground />
      
      <div className="max-w-4xl w-full cyber-panel p-8 rounded-lg z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <Terminal className="text-cyber-neon-blue w-8 h-8 mr-2" />
            <h1 className="neon-text text-4xl sm:text-5xl font-bold tracking-tighter">
              <GlitchText text="CODE CONSPIRACY" glitchInterval={3000} />
            </h1>
          </div>
          
          {progress > 0 && (
            <div className="cyber-border px-4 py-2 rounded-md mb-4">
              <span className="neon-text-green">
                Mission Progress: {progress}/{gameState.totalLevels} Levels Completed
              </span>
            </div>
          )}
        </div>
        
        <div className="cyber-panel p-6 rounded-md mb-6">
          <div className="flex items-center mb-4">
            <span className="text-cyber-neon-green mr-2">{'>'}</span>
            <h2 className="neon-text-pink text-xl">MISSION BRIEFING</h2>
          </div>
          
          <div className="text-gray-300 mb-6 h-40 overflow-y-auto">
            {showBrief ? (
              <TypingText
                text={`TOP SECRET: For your eyes only, Agent.

A series of encrypted messages has been intercepted from an unknown source. These messages are believed to contain critical information about "The Lost Code of Enigma", a legendary encryption algorithm thought to be unbreakable.

Your mission: Debug the corrupted code fragments we've managed to recover. Each fragment contains hidden clues that, when assembled, will reveal the location of the Lost Code.

Be cautious, Agent. As you advance, the encryption complexity will increase.

Time is of the essence. The future of global cybersecurity depends on your programming skills.

Good luck.`}
                speed={20}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="neon-text-blue animate-pulse">Establishing secure connection...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/levels" onClick={handleStartMission}>
            <CyberButton className="text-lg px-8 py-4">
              <span className="flex items-center">
                START MISSION
                {gameState.completedLevels.length === 0 && <Lock className="ml-2 w-4 h-4" />}
              </span>
            </CyberButton>
          </Link>
          
          {progress > 0 && (
            <Link to="/clues">
              <CyberButton variant="pink" className="text-lg px-8 py-4">
                VIEW COLLECTED CLUES
              </CyberButton>
            </Link>
          )}
        </div>
      </div>
      
      <footer className="fixed bottom-4 text-sm text-gray-500 z-10">
        <div className="flex gap-2">
          <span className="neon-text-blue">// System: </span>
          <span>Debug_Mode=true</span>
          <span>Security_Protocol=active</span>
          <span>Version=1.0.0</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
