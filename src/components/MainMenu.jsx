import React from 'react';
import { Play, Music, Trophy, Award, Volume2, VolumeX } from 'lucide-react';

const MainMenu = ({ onStart, highScore, onViewLeaderboard, isMuted, onToggleMute }) => {
  return (
    <div className="text-center max-w-lg w-full relative z-10">
      <div className="bg-white border-4 border-black p-8 relative mb-8 hard-shadow-lg shadow-retro-pink">
        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-retro-yellow border-4 border-black rounded-full animate-bounce"></div>
        
        <div className="mb-2 inline-block bg-black text-retro-cyan px-2 py-1 font-mono text-xs">VER 1.0</div>
        <h1 className="font-pixel text-4xl md:text-5xl leading-snug mb-6 text-black">
          KUIS<br/>ANAK 90AN
        </h1>
        <p className="font-retro text-xl mb-8 text-gray-600 border-t-2 border-b-2 border-gray-300 py-2">
          Uji pengetahuan masa kecilmu! Kartun, Mainan, & Jajanan.
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={onStart}
            className="w-full bg-retro-cyan border-4 border-black py-4 text-xl font-bold transition-all hard-shadow hover:shadow-hard-shadow-sm hover:translate-y-1 hover:translate-x-1 active:translate-y-2 active:translate-x-2"
          >
            <span className="font-pixel flex items-center justify-center gap-2">
              <Play className="w-6 h-6 fill-current" /> INSERT COIN
            </span>
          </button>
          
          <button 
            onClick={onViewLeaderboard}
            className="w-full bg-retro-yellow border-4 border-black py-3 text-lg font-bold transition-all hard-shadow-sm hover:shadow-hard-shadow hover:translate-y-1 hover:translate-x-1"
          >
            <span className="font-pixel flex items-center justify-center gap-2 text-sm">
              <Award className="w-5 h-5" /> LIHAT RANKING
            </span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onToggleMute}
          className="bg-retro-purple border-4 border-black p-2 hard-shadow-sm hover:bg-retro-pink transition-colors"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
        <div className="bg-retro-yellow border-4 border-black px-4 py-2 font-mono font-bold hard-shadow-sm">
          HIGHSCORE: {highScore.toString().padStart(4, '0')}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
