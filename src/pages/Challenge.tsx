import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatrixBackground from '@/components/MatrixBackground';
import CodeEditor from '@/components/CodeEditor';
import CyberButton from '@/components/CyberButton';
import { useGameState } from '@/contexts/GameContext';
import { levels } from '@/data/levels';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Terminal, Play, Lightbulb, Award, ChevronRight } from 'lucide-react';

interface OutputResult {
  type: 'success' | 'error';
  message: string;
}

const Challenge: React.FC = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { gameState, completeLevel, addClue } = useGameState();
  
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<OutputResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const level = levels.find(l => l.id === Number(levelId));
  
  useEffect(() => {
    if (!level) {
      navigate('/levels');
      return;
    }
    
    // Make sure we set the code when level changes
    setCode(level.initialCode || '');
    setOutput(null);
    setShowHint(false);
    setShowClue(false);
    setIsCorrect(false);
  }, [level, navigate]);
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Reset when code changes
    if (isCorrect) {
      setIsCorrect(false);
      setShowClue(false);
    }
  };
  
  const handleRunCode = () => {
    // Play sound effect
    const keyboardSound = new Audio('/keyboard.mp3');
    keyboardSound.volume = 0.2;
    keyboardSound.play().catch(() => {
      // Silent error for browsers that block autoplay
    });
    
    if (!level) return;
    
    // Improved code comparison logic
    setTimeout(() => {
      // Normalize both the user code and solution by removing whitespace and comments
      const normalizeCode = (codeStr: string) => {
        return codeStr
          .replace(/\s+/g, '') // Remove all whitespace
          .replace(/#.*$/gm, ''); // Remove Python comments
      };
      
      const normalizedCode = normalizeCode(code);
      const normalizedSolution = normalizeCode(level.solution);
      
      console.log("User code:", normalizedCode);
      console.log("Solution:", normalizedSolution);
      
      if (normalizedCode === normalizedSolution) {
        // Success!
        setOutput({
          type: 'success',
          message: `Execution successful!\n\nOutput:\n${level.clue}`
        });
        setIsCorrect(true);
        
        // Play success sound
        const successSound = new Audio('/success.mp3');
        successSound.volume = 0.3;
        successSound.play().catch(() => {});
        
        // Mark level as completed
        completeLevel(level.id);
        addClue(level.id, level.clue);
        
        toast({
          title: "Code Debugged Successfully!",
          description: `You've unlocked clue #${level.id}`,
        });
      } else {
        // Provide feedback based on code similarity
        setOutput({
          type: 'error',
          message: 'Execution failed!\n\nError: Code still contains bugs. Try again.'
        });
        
        // Play error sound
        const errorSound = new Audio('/error.mp3');
        errorSound.volume = 0.2;
        errorSound.play().catch(() => {});
      }
    }, 1000);
  };
  
  const handleNextLevel = () => {
    if (!level) return;
    
    const nextLevelId = level.id + 1;
    const nextLevel = levels.find(l => l.id === nextLevelId);
    
    if (nextLevel) {
      navigate(`/challenge/${nextLevelId}`);
    } else {
      navigate('/clues');
    }
  };
  
  if (!level) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen py-12 px-4 relative">
      <MatrixBackground />
      
      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <CyberButton onClick={() => navigate('/levels')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Levels
          </CyberButton>
          
          <h1 className="neon-text text-2xl sm:text-3xl font-bold">
            Level {level?.id}: {level?.title}
          </h1>
          
          <div className="cyber-border px-4 py-2 rounded-md flex items-center">
            <Terminal className="text-cyber-neon-blue mr-2 h-4 w-4" />
            <span className="neon-text">Debug Challenge</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel - Challenge description */}
          <div className="cyber-panel p-6 rounded-lg">
            <h2 className="neon-text-pink text-xl mb-4">Mission Details</h2>
            <p className="text-gray-300 mb-6">{level?.description}</p>
            
            {showHint && level && (
              <div className="bg-cyber-dark-purple/50 p-4 rounded-md mb-4 border border-cyber-neon-purple">
                <h3 className="text-cyber-neon-purple mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Debugging Hint
                </h3>
                <p className="text-gray-300 text-sm">{level.hint}</p>
              </div>
            )}
            
            {isCorrect && showClue && level && (
              <div className="bg-cyber-dark-blue/50 p-4 rounded-md border border-cyber-neon-green animate-fade-in">
                <h3 className="text-cyber-neon-green mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Clue Recovered
                </h3>
                <div className="cyber-border p-2 rounded-md text-center">
                  <span className="neon-text-green font-bold text-xl">{level.clue}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-3 mt-8">
              {!isCorrect && (
                <CyberButton
                  onClick={() => setShowHint(true)}
                  variant="pink"
                  className="w-full"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Request Hint
                </CyberButton>
              )}
              
              {isCorrect && (
                <CyberButton
                  onClick={() => setShowClue(true)}
                  variant="green"
                  className="w-full"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Reveal Clue
                </CyberButton>
              )}
              
              {isCorrect && (
                <CyberButton
                  onClick={handleNextLevel}
                  className="w-full mt-4"
                >
                  <span className="flex items-center">
                    Next Challenge
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </CyberButton>
              )}
            </div>
          </div>
          
          {/* Middle panel - Code editor */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex justify-end">
              <CyberButton onClick={handleRunCode}>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </CyberButton>
            </div>
            
            <CodeEditor
              initialCode={level?.initialCode || ''}
              solution={level?.solution || ''}
              onChange={handleCodeChange}
            />
            
            {output && (
              <div className={`cyber-panel p-4 rounded-md mt-4 border ${
                output.type === 'success' ? 'border-cyber-neon-green' : 'border-cyber-neon-pink'
              }`}>
                <h3 className={`${
                  output.type === 'success' ? 'text-cyber-neon-green' : 'text-cyber-neon-pink'
                } text-sm mb-2`}>
                  {output.type === 'success' ? 'Output' : 'Error'}
                </h3>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                  {output.message}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
