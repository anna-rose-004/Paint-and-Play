import React from 'react';
import { Palette, Star, Smile, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const handleStartGame = () => {
    soundManager.playSound('click');
    soundManager.startBackgroundMusic();
    onStartGame();
  };

  const toggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      soundManager.playSound('click');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 lg:p-4">
      {/* Sound Toggle */}
      <div className="absolute top-2 right-2 lg:top-4 lg:right-4">
        <button
          onClick={toggleSound}
          className="bg-white p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
          aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
          ) : (
            <VolumeX className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
          )}
        </button>
      </div>

      <div className="max-w-4xl mx-auto text-center px-2">
        {/* Game Title */}
        <div className="mb-4 lg:mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 lg:mb-4">
            Rainbow Paint
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 font-medium">
            Learn Colors • Have Fun • Create Art
          </p>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-12">
          <div className="flex flex-col items-center p-3 lg:p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <Palette className="w-8 h-8 lg:w-12 lg:h-12 text-purple-500 mb-2 lg:mb-3" />
            <p className="text-sm lg:text-lg font-semibold text-gray-700">Easy Colors</p>
          </div>
          <div className="flex flex-col items-center p-3 lg:p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <Star className="w-8 h-8 lg:w-12 lg:h-12 text-yellow-500 mb-2 lg:mb-3" />
            <p className="text-sm lg:text-lg font-semibold text-gray-700">Fun Levels</p>
          </div>
          <div className="flex flex-col items-center p-3 lg:p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <Smile className="w-8 h-8 lg:w-12 lg:h-12 text-green-500 mb-2 lg:mb-3" />
            <p className="text-sm lg:text-lg font-semibold text-gray-700">Big Smiles</p>
          </div>
        </div>

        {/* Game Description */}
        <div className="mb-6 lg:mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3 lg:mb-6">How to Play</h2>
          <div className="grid md:grid-cols-3 gap-3 lg:gap-6">
            <div className="bg-blue-50 p-3 lg:p-6 rounded-2xl">
              <div className="text-2xl lg:text-4xl mb-2 lg:mb-3">1️⃣</div>
              <p className="text-sm lg:text-lg text-gray-700">Look at the number</p>
            </div>
            <div className="bg-green-50 p-3 lg:p-6 rounded-2xl">
              <div className="text-2xl lg:text-4xl mb-2 lg:mb-3">🎨</div>
              <p className="text-sm lg:text-lg text-gray-700">Pick the right color</p>
            </div>
            <div className="bg-purple-50 p-3 lg:p-6 rounded-2xl">
              <div className="text-2xl lg:text-4xl mb-2 lg:mb-3">✨</div>
              <p className="text-sm lg:text-lg text-gray-700">Watch the magic!</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl lg:text-3xl font-bold py-4 px-8 lg:py-6 lg:px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          🎨 Start Playing! 🎨
        </button>

        {/* Accessibility Note */}
        <div className="mt-4 lg:mt-8 text-gray-500 text-sm lg:text-lg px-4">
          <p>• Accessible • Educational • Fun</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;