import React, { useState } from 'react';
import { RefreshCcw, Trophy, Send } from 'lucide-react';
import { submitScore } from '../firebase/leaderboard';

const GameOver = ({ isWin, score, onRestart, onScoreSubmitted }) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Nama tidak boleh kosong!');
      return;
    }

    if (username.trim().length < 3) {
      setError('Nama minimal 3 karakter!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitScore(username, score);
      setSubmitted(true);
      if (onScoreSubmitted) {
        onScoreSubmitted();
      }
    } catch (err) {
      console.error('Error submitting score:', err);
      setError('Gagal menyimpan skor. Coba lagi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareToWhatsApp = () => {
    const text = `🎮 Gue dapet skor ${score} di Kuis Anak 90an! ${isWin ? '🏆 PERFECT SCORE!' : ''}\n\nBisa ngalahin gue gak? 🔥\n\nMain di: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="text-center max-w-lg w-full relative z-10 animate-in fade-in zoom-in duration-300">
      <div className={`border-4 border-black p-8 relative hard-shadow-lg ${isWin ? 'bg-retro-cyan' : 'bg-retro-pink'}`}>
        <h1 className="font-pixel text-4xl md:text-5xl mb-6 text-white neon-text animate-pulse">
          {isWin ? "MISSION COMPLETE" : "GAME OVER"}
        </h1>
        
        <div className="bg-white border-2 border-black p-4 mb-6">
          <p className="font-pixel text-xs text-gray-500 mb-2">FINAL SCORE</p>
          <p className="font-pixel text-4xl">{score}</p>
        </div>

        <p className="font-retro text-xl font-bold mb-8">
          {isWin ? "Wow! Kamu anak 90an sejati!" : "Yah, coba lagi yuk! Jangan lupa tiup kasetnya dulu."}
        </p>

        {/* Form Submit Score */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="bg-white border-2 border-black p-4 mb-4">
              <label className="font-pixel text-xs block mb-2 text-left">MASUKKAN NAMA:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                placeholder="BudiGaming99"
                className="w-full font-retro text-xl p-2 border-2 border-black focus:outline-none focus:border-retro-pink"
                disabled={isSubmitting}
              />
              {error && (
                <p className="font-retro text-sm text-red-600 mt-2">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-retro-yellow border-4 border-black px-8 py-3 hover:bg-retro-cyan hard-shadow-sm hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <span className="font-pixel flex items-center justify-center gap-2 text-sm">
                <Send className="w-4 h-4" /> 
                {isSubmitting ? 'MENYIMPAN...' : 'KIRIM SKOR'}
              </span>
            </button>
          </form>
        ) : (
          <div className="bg-retro-cyan border-2 border-black p-4 mb-6">
            <p className="font-retro text-lg font-bold">✅ Skor berhasil disimpan!</p>
          </div>
        )}

        {/* Share Button */}
        <button
          onClick={shareToWhatsApp}
          className="w-full bg-green-500 border-4 border-black px-8 py-3 hover:bg-green-600 hard-shadow-sm hover:translate-y-1 mb-4"
        >
          <span className="font-pixel flex items-center justify-center gap-2 text-sm text-white">
            📱 SHARE KE WHATSAPP
          </span>
        </button>

        <button 
          onClick={onRestart}
          className="bg-white border-4 border-black px-8 py-3 hover:bg-retro-yellow hard-shadow-sm hover:translate-y-1"
        >
          <span className="font-pixel flex items-center gap-2 text-sm">
            <RefreshCcw className="w-4 h-4" /> RESTART
          </span>
        </button>
      </div>
    </div>
  );
};

export default GameOver;
