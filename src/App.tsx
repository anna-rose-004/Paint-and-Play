import React, { useState } from 'react';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleStartGame = () => {
    setCurrentPage('game');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentLevel(1);
  };

  const handleNextLevel = () => {
    setCurrentLevel(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {currentPage === 'home' ? (
        <HomePage onStartGame={handleStartGame} />
      ) : (
        <GamePage 
          level={currentLevel}
          onBackToHome={handleBackToHome}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
}

export default App;