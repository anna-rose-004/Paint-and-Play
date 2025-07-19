import React from 'react';
import { Level } from '../data/levels';

interface GameCanvasProps {
  level: Level;
  filledSections: Record<number, string>;
  currentInstruction: { number: number; color: string } | null;
  onSectionClick: (sectionNumber: number) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  level, 
  filledSections, 
  currentInstruction,
  onSectionClick 
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 lg:p-6 shadow-lg">
      <h3 className="text-lg lg:text-2xl font-bold text-gray-800 mb-2 lg:mb-4 text-center">{level.name}</h3>
      
      <div className="relative bg-gray-50 rounded-2xl p-2 lg:p-8">
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-auto max-w-sm lg:max-w-lg mx-auto"
          style={{ minHeight: '200px' }}
        >
          {level.sections.map((section) => (
            <g key={section.number}>
              <path
                d={section.path}
                fill={filledSections[section.number] || '#ffffff'}
                stroke="#333"
                strokeWidth="3"
                className={`
                  cursor-pointer transition-all duration-200
                  ${currentInstruction?.number === section.number 
                    ? 'stroke-blue-500 stroke-[5px] drop-shadow-lg' 
                    : 'hover:stroke-blue-400'
                  }
                `}
                onClick={() => onSectionClick(section.number)}
              />
              
              {/* Number label */}
              <text
                x={section.labelX}
                y={section.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`
                  text-xl lg:text-2xl font-bold pointer-events-none select-none
                  ${filledSections[section.number] ? 'fill-white' : 'fill-gray-800'}
                  ${currentInstruction?.number === section.number ? 'fill-blue-600' : ''}
                `}
                style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}
              >
                {section.number}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="mt-2 lg:mt-4 text-center">
        <p className="text-sm lg:text-lg text-gray-600">
          Click on number <span className="font-bold text-blue-600">{currentInstruction?.number}</span> to color it!
        </p>
      </div>
    </div>
  );
};

export default GameCanvas;