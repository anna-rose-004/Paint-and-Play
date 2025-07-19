import React, { useEffect, useState } from 'react';
import { Star, Heart, Smile } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const SuccessAnimation: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    // Play celebration sound when animation starts
    soundManager.playSound('celebration');
    
    // Create confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFE66D'][Math.floor(Math.random() * 6)]
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`
          }}
        />
      ))}
      
      {/* Success Message */}
      <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md mx-4 transform animate-pulse">
        <div className="mb-6 flex justify-center space-x-4">
          <Star className="w-12 h-12 text-yellow-500 animate-spin" />
          <Heart className="w-12 h-12 text-red-500 animate-bounce" />
          <Smile className="w-12 h-12 text-green-500 animate-pulse" />
        </div>
        
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Amazing Work!
        </h2>
        
        <p className="text-2xl text-gray-700 mb-6">
          You completed the picture! 🎨✨
        </p>
        
        <div className="text-6xl mb-4">🌟</div>
        
        <p className="text-xl text-gray-600">
          Getting ready for the next level...
        </p>
      </div>
    </div>
  );
};

export default SuccessAnimation;