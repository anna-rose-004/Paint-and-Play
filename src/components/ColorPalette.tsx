import React from 'react';
import { colorMap } from './colorMap';

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  requiredColor?: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ 
  colors, 
  selectedColor, 
  onColorSelect,
  requiredColor 
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 lg:p-6 shadow-lg">
      <h3 className="text-lg lg:text-2xl font-bold text-gray-800 mb-2 lg:mb-4">Color Palette</h3>
      <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-4">
        {colors.map((color, index) => {
          const isSelected = selectedColor === color;
          const isRequired = requiredColor === color;
          const colorName = colorMap[color.toUpperCase()] || 'Unknown';

          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <button
                onClick={() => onColorSelect(color)}
                className={`
                  w-full h-10 lg:h-16 rounded-xl border-4 transition-all duration-200 focus:outline-none
                  ${isSelected ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-300 hover:border-gray-400'}
                  ${isRequired ? 'ring-4 ring-yellow-300 ring-opacity-50 animate-pulse' : ''}
                `}
                style={{ backgroundColor: color }}
                aria-label={`Select ${colorName}`}
              >
                {isSelected && (
                  <div className="w-full h-full rounded-lg bg-white bg-opacity-30 flex items-center justify-center">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-full" />
                  </div>
                )}
              </button>
              <span className="text-xs lg:text-sm font-medium text-gray-700 text-center">{colorName}</span>
            </div>
          );
        })}
      </div>

      {selectedColor && (
        <div className="mt-2 lg:mt-4 p-2 lg:p-4 bg-blue-50 rounded-xl">
          <p className="text-center text-sm lg:text-lg font-semibold text-blue-800">
            ✨ Color Selected! Now find the number! ✨
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
