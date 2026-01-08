import React, { useMemo } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { COLORS } from '../data/questions';

const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-4 h-4 bg-black animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          backgroundColor: [COLORS.pink, COLORS.cyan, COLORS.yellow][Math.floor(Math.random() * 3)],
          animationDuration: `${0.5 + Math.random()}s`,
          animationDelay: `${Math.random()}s`
        }}
      />
    ))}
  </div>
);

const FeedbackOverlay = ({ feedbackType }) => {
  if (!feedbackType) return null;
  
  const isCorrect = feedbackType === 'correct';
  
  // Pesan motivasi random untuk jawaban benar
  const correctMessages = [
    "HEBAT!",
    "MANTAP!",
    "KEREN!",
    "JAGOAN!",
    "NOSTALGIA BANGET!",
    "TOP MARKOTOP!",
    "PERFECT!",
    "LEGEND!"
  ];
  
  // Pesan untuk jawaban salah
  const wrongMessages = [
    "SALAH!",
    "WADUH!",
    "HAMPIR!",
    "COBA LAGI!",
    "NEXT TIME!"
  ];
  
  // Pilih pesan random (useMemo agar tidak berubah saat re-render)
  const message = useMemo(() => {
    const messages = isCorrect ? correctMessages : wrongMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  }, [feedbackType]);
  
  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm ${
      !isCorrect ? 'animate-shake' : ''
    }`}>
      <div className={`relative border-4 border-black p-8 text-center transform rotate-2 hard-shadow ${
        isCorrect ? 'bg-retro-cyan' : 'bg-retro-pink'
      }`}>
        {isCorrect && <Confetti />}
        
        <div className="mb-4">
          {isCorrect ? (
            <CheckCircle className="w-24 h-24 mx-auto text-white" strokeWidth={3} />
          ) : (
            <XCircle className="w-24 h-24 mx-auto text-white" strokeWidth={3} />
          )}
        </div>
        
        <h2 className="font-pixel text-4xl md:text-6xl mb-4 text-white neon-text">
          {message}
        </h2>
        <p className="font-retro text-2xl font-bold bg-white inline-block px-2 border-2 border-black">
          {isCorrect ? "+100 POINT" : "-1 LIFE"}
        </p>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
