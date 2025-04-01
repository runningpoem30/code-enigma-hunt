
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatrixBackground from '@/components/MatrixBackground';
import CyberButton from '@/components/CyberButton';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <MatrixBackground />
      
      <div className="cyber-panel p-8 rounded-lg max-w-md w-full text-center z-10 animate-fade-in">
        <AlertTriangle className="mx-auto h-16 w-16 text-cyber-neon-pink mb-4" />
        
        <h1 className="neon-text-pink text-4xl font-bold mb-4">
          ERROR 404
        </h1>
        
        <div className="cyber-border p-2 rounded-md mb-6 bg-cyber-dark-purple/30">
          <span className="text-cyber-neon-blue font-mono">
            FILE_NOT_FOUND: {location.pathname}
          </span>
        </div>
        
        <p className="text-gray-300 mb-8">
          The file you are trying to access has been corrupted or moved to another sector.
        </p>
        
        <CyberButton onClick={() => navigate("/")} className="mx-auto">
          Return to Dashboard
        </CyberButton>
      </div>
    </div>
  );
};

export default NotFound;
