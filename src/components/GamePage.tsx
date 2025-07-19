import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import ColorPalette from './ColorPalette';
import GameCanvas from './GameCanvas';
import SuccessAnimation from './SuccessAnimation';
import { levels } from '../data/levels';
import { soundManager } from '../utils/soundManager';

interface GamePageProps {
  level: number;
  onBackToHome: () => void;
  onNextLevel: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ level, onBackToHome, onNextLevel }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [filledSections, setFilledSections] = useState<Record<number, string>>({});
  const [currentInstruction, setCurrentInstruction] = useState<{ number: number; color: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);



  const currentLevel = levels[Math.min(level - 1, levels.length - 1)];
  const totalSections = currentLevel.sections.length;
  const progressPercentage = (completedSections.length / totalSections) * 100;
  

  useEffect(() => {
    // Set the first instruction
    const firstIncompleteSection = currentLevel.sections.find(
      section => !completedSections.includes(section.number)
    );
    if (firstIncompleteSection) {
      setCurrentInstruction({
        number: firstIncompleteSection.number,
        color: firstIncompleteSection.color
      });
    }
  }, [level, completedSections, currentLevel.sections]);

  const handleSectionClick = (sectionNumber: number) => {
    if (!currentInstruction || !selectedColor) return;
    
    if (sectionNumber === currentInstruction.number && selectedColor === currentInstruction.color) {
      // Play success sound for correct match
      soundManager.playSound('correctMatch');
      
      // Correct color and section
      const newFilledSections = { ...filledSections, [sectionNumber]: selectedColor };
      setFilledSections(newFilledSections);
      
      const newCompletedSections = [...completedSections, sectionNumber];
      setCompletedSections(newCompletedSections);
      
      // Check if level is complete
      if (newCompletedSections.length === totalSections) {
        // Play level completion sound sequence
        soundManager.playSuccessSequence();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onNextLevel();
          setFilledSections({});
          setCompletedSections([]);
        }, 3000);
      } else {
        // Move to next section
        const nextSection = currentLevel.sections.find(
          section => !newCompletedSections.includes(section.number)
        );
        if (nextSection) {
          setCurrentInstruction({
            number: nextSection.number,
            color: nextSection.color
          });
        }
      }
      setSelectedColor('');
    } else {
      // Play gentle feedback for incorrect selection
      soundManager.playSound('click');
    }
  };

  const handleReset = () => {
    soundManager.playSound('click');
    setFilledSections({});
    setCompletedSections([]);
    setSelectedColor('');
    const firstSection = currentLevel.sections[0];
    setCurrentInstruction({
      number: firstSection.number,
      color: firstSection.color
    });
  };

  const handleBackToHome = () => {
    soundManager.playSound('click');
    soundManager.stopBackgroundMusic();
    onBackToHome();
  };

  const toggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      soundManager.playSound('click');
    }
  };

  return (
    <div className="min-h-screen p-2 lg:p-4">
      {showSuccess && <SuccessAnimation />}
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-3 lg:mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl p-3 lg:p-6 shadow-lg">
          <div className="flex items-center gap-2 lg:gap-4 mb-2 md:mb-0">
            <button
              onClick={handleBackToHome}
              className="bg-gray-100 hover:bg-gray-200 p-2 lg:p-3 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800">
              Level {level} - {currentLevel.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={toggleSound}
              className="bg-purple-100 hover:bg-purple-200 p-2 lg:p-3 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-purple-300"
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              ) : (
                <VolumeX className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="bg-orange-100 hover:bg-orange-200 p-2 lg:p-3 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
            </button>
            
            {/* Progress */}
            <div className="flex items-center gap-1 lg:gap-2">
              <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
              <span className="text-base lg:text-lg font-semibold">
                {completedSections.length}/{totalSections}
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 lg:mt-4 bg-gray-200 rounded-full h-2 lg:h-3 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 lg:h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 0 && (
              <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse rounded-full" />
            )}
          </div>
          {progressPercentage === 100 && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-3 lg:gap-6">
        {/* Game Canvas */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <GameCanvas
            level={currentLevel}
            filledSections={filledSections}
            currentInstruction={currentInstruction}
            onSectionClick={handleSectionClick}
          />
        </div>

        {/* Controls */}
        <div className="space-y-3 lg:space-y-4 order-1 lg:order-2">
          {/* Current Instruction */}
          {currentInstruction && (
            <div className="bg-white rounded-2xl p-3 lg:p-6 shadow-lg">
              <h3 className="text-lg lg:text-2xl font-bold text-gray-800 mb-2 lg:mb-4">Find & Color</h3>
              <div className="text-center">
                <div className="bg-blue-50 rounded-2xl p-3 lg:p-6 mb-2 lg:mb-4">
                  <div className="text-3xl lg:text-6xl font-bold text-blue-600 mb-1 lg:mb-2">
                    {currentInstruction.number}
                  </div>
                  <p className="text-sm lg:text-xl text-gray-600">Find this number!</p>
                </div>
                <div className="flex items-center justify-center gap-2 lg:gap-4">
                  <p className="text-sm lg:text-lg font-semibold">Use this color:</p>
                  <div 
                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl border-4 border-gray-300"
                    style={{ backgroundColor: currentInstruction.color }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Color Palette */}
          <ColorPalette
            colors={currentLevel.colors}
            selectedColor={selectedColor}
            onColorSelect={(color) => {
              soundManager.playSound('coinEarned');
              setSelectedColor(color);
            }}
            requiredColor={currentInstruction?.color}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;