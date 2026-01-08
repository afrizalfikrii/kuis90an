import React from 'react';
import { Heart, Trophy, Clock } from 'lucide-react';

const GameScreen = ({ question, qIndex, totalQuestions, score, lives, onAnswer, timeLeft }) => {
  // Warna badge berdasarkan kategori
  const getCategoryColor = (category) => {
    const colors = {
      'Kartun': 'bg-retro-pink',
      'Mainan': 'bg-retro-cyan',
      'Jajanan': 'bg-retro-yellow',
      'Game': 'bg-retro-purple',
      'TV': 'bg-orange-400',
      'Teknologi': 'bg-blue-400'
    };
    return colors[category] || 'bg-gray-400';
  };

  // Progress percentage
  const progress = ((qIndex + 1) / totalQuestions) * 100;
  
  // Warna timer berdasarkan waktu tersisa
  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-retro-cyan';
    if (timeLeft > 5) return 'text-retro-yellow';
    return 'text-red-500 animate-pulse';
  };

  return (
    <div className="w-full max-w-2xl relative z-10">
      {/* Top HUD */}
      <div className="flex justify-between items-center mb-6 bg-black text-white p-3 border-4 border-retro-purple hard-shadow">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-retro-yellow">LIVES:</span>
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-6 h-6 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Timer */}
        <div className="flex items-center gap-2">
          <Clock className={`w-6 h-6 ${getTimerColor()}`} />
          <span className={`font-pixel text-2xl ${getTimerColor()}`}>
            {timeLeft}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-retro-yellow" />
          <span className="font-pixel text-lg">{score.toString().padStart(4, '0')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-white border-4 border-black p-3 hard-shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-xs">PROGRESS</span>
          <span className="font-pixel text-xs">{qIndex + 1}/{totalQuestions}</span>
        </div>
        <div className="w-full h-4 bg-gray-300 border-2 border-black relative overflow-hidden">
          <div 
            className="h-full bg-retro-cyan transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border-4 border-black p-6 mb-6 hard-shadow relative">
        <div className="absolute -top-4 left-4 bg-retro-pink border-2 border-black px-3 py-1">
          <span className="font-pixel text-xs">LEVEL {qIndex + 1}/{totalQuestions}</span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute -top-4 right-4">
          <div className={`${getCategoryColor(question.category)} border-2 border-black px-3 py-1`}>
            <span className="font-pixel text-xs text-white drop-shadow-[1px_1px_0px_#000]">
              {question.category.toUpperCase()}
            </span>
          </div>
        </div>
        
        <h3 className="font-retro text-3xl mt-4 mb-4 leading-tight font-bold">
          {question.question}
        </h3>

        {question.image && (
          <div className="w-full h-48 bg-gray-200 border-2 border-black mb-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-retro-purple opacity-20 group-hover:opacity-0 transition-opacity"></div>
            <img src={question.image} alt="Clue" className="w-full h-full object-cover" />
            {/* Scanlines Effect */}
            <div className="absolute inset-0 scanlines pointer-events-none"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(opt)}
              className="relative group text-left"
            >
              <div className="bg-white border-2 border-black p-4 transition-all hover:bg-retro-yellow active:bg-retro-cyan active:translate-y-1 hard-shadow-sm group-hover:hard-shadow">
                <span className="font-pixel text-xs mr-2 text-retro-pink">{['A','B','C','D'][i]}.</span>
                <span className="font-retro text-xl font-bold">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
