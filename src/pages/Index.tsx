
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameProvider } from '@/contexts/GameContext';
import Dashboard from './Dashboard';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // This page now serves as our index/root route
    // It wraps the Dashboard component with the GameProvider
  }, [navigate]);

  return (
    <GameProvider>
      <Dashboard />
    </GameProvider>
  );
};

export default Index;
