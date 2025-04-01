
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  initialCode: string;
  solution: string;
  onChange?: (code: string) => void;
  className?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  solution,
  onChange,
  className = "",
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isSolved, setIsSolved] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  // Re-initialize the code when initialCode prop changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    setLines(code.split("\n"));
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange && onChange(newCode);
    
    // Check if the code matches the solution (simplified for demo)
    const normalizedCode = newCode.replace(/\s+/g, '');
    const normalizedSolution = solution.replace(/\s+/g, '');
    setIsSolved(normalizedCode === normalizedSolution);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert 2 spaces for a tab
      const newText = code.substring(0, start) + "  " + code.substring(end);
      setCode(newText);

      // Move cursor to correct position after inserting the tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="cyber-panel code-editor rounded-md relative">
        <div className="absolute top-0 right-0 px-3 py-1">
          {isSolved && (
            <span className="text-cyber-neon-green">✓ Solved</span>
          )}
        </div>
        
        <div className="absolute top-0 left-0 w-full h-8 bg-cyber-dark-purple/80 flex items-center px-4 border-b border-cyber-neon-blue/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-xs text-cyber-neon-blue/70">code_challenge.py</div>
        </div>

        <div className="pt-8">
          <div className="relative">
            <div className="absolute left-0 top-0 py-4 select-none">
              {lines.map((_, i) => (
                <div key={i} className="line-number">
                  {i + 1}
                </div>
              ))}
            </div>
            
            <textarea
              value={code}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-cyber-neon-green font-mono pl-10 outline-none resize-none"
              spellCheck={false}
              readOnly={readOnly}
              rows={Math.max(10, lines.length)} // Ensure minimum height
              style={{ minHeight: "200px" }}
            />
          </div>
        </div>
      </div>
      
      <div className="scan-line"></div>
    </div>
  );
};

export default CodeEditor;
