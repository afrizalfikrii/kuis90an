import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import FeedbackOverlay from './components/FeedbackOverlay';
import { QUESTIONS } from './data/questions';
import { getTopScores } from './firebase/leaderboard';
import { audioManager } from './utils/audioManager';
import './index.css';

function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('menu'); // menu, playing, feedback, gameover, win, leaderboard
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedbackType, setFeedbackType] = useState(null); // 'correct', 'wrong'
  const [highScore, setHighScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // Timer 20 detik per pertanyaan
  const [isMuted, setIsMuted] = useState(false);

  // Fetch high score on mount
  useEffect(() => {
    fetchHighScore();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      // Waktu habis, anggap jawaban salah
      handleAnswer('__TIMEOUT__');
    }
  }, [gameState, timeLeft]);

  // Music control based on game state
  useEffect(() => {
    if (gameState === 'menu' || gameState === 'leaderboard') {
      audioManager.playBgMusic('menu');
    } else if (gameState === 'playing') {
      audioManager.playBgMusic('gameplay');
    } else if (gameState === 'feedback') {
      // Pause music saat feedback overlay
      audioManager.stopBgMusic();
    } else if (gameState === 'gameover') {
      audioManager.stopBgMusic();
      audioManager.playSound('gameover');
    } else if (gameState === 'win') {
      audioManager.stopBgMusic();
      audioManager.playSound('gamewin');
    }
  }, [gameState]);

  const fetchHighScore = async () => {
    try {
      const topScores = await getTopScores(1);
      if (topScores.length > 0) {
        setHighScore(topScores[0].score);
      }
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const toggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  // --- HANDLERS ---
  const startGame = () => {
    setGameState('playing');
    setQIndex(0);
    setScore(0);
    setLives(3);
    setFeedbackType(null);
    setShowLeaderboard(false);
    setTimeLeft(20); // Reset timer
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === QUESTIONS[qIndex].answer;

    if (isCorrect) {
      setScore(score + 100);
      setFeedbackType('correct');
      setGameState('feedback');
      
      // Delay next question
      setTimeout(() => {
        if (qIndex + 1 < QUESTIONS.length) {
          setQIndex(qIndex + 1);
          setGameState('playing');
          setFeedbackType(null);
          setTimeLeft(20); // Reset timer untuk pertanyaan berikutnya
        } else {
          setGameState('win');
        }
      }, 1500);
    } else {
      setFeedbackType('wrong');
      setGameState('feedback');
      
      setTimeout(() => {
        if (lives - 1 <= 0) {
          setLives(0);
          setGameState('gameover');
        } else {
          setLives(lives - 1);
          // Advance to next question
          if (qIndex + 1 < QUESTIONS.length) {
            setQIndex(qIndex + 1);
            setGameState('playing');
            setFeedbackType(null);
            setTimeLeft(20); // Reset timer untuk pertanyaan berikutnya
          } else {
            setGameState('win');
          }
        }
      }, 1500);
    }
  };

  const handleScoreSubmitted = () => {
    fetchHighScore();
    setShowLeaderboard(true);
  };

  const handleRestart = () => {
    setShowLeaderboard(false);
    setGameState('menu');
  };

  const handleViewLeaderboard = () => {
    setGameState('leaderboard');
    setShowLeaderboard(true);
  };

  return (
    <div className="retro-pattern min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-retro-pink rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-retro-cyan rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-8 border-retro-purple rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Feedback Overlay */}
      {gameState === 'feedback' && <FeedbackOverlay feedbackType={feedbackType} />}
      
      {/* Main Content */}
      {gameState === 'menu' && <MainMenu onStart={startGame} highScore={highScore} onViewLeaderboard={handleViewLeaderboard} isMuted={isMuted} onToggleMute={toggleMute} />}
      
      {(gameState === 'playing' || gameState === 'feedback') && (
        <GameScreen 
          question={QUESTIONS[qIndex]}
          qIndex={qIndex}
          totalQuestions={QUESTIONS.length}
          score={score}
          lives={lives}
          onAnswer={handleAnswer}
          timeLeft={timeLeft}
        />
      )}
      
      {(gameState === 'gameover' || gameState === 'win') && !showLeaderboard && (
        <GameOver 
          isWin={gameState === 'win'}
          score={score}
          onRestart={handleRestart}
          onScoreSubmitted={handleScoreSubmitted}
        />
      )}

      {(showLeaderboard || gameState === 'leaderboard') && (
        <div className="space-y-4">
          <Leaderboard />
          <button
            onClick={handleRestart}
            className="w-full bg-retro-cyan border-4 border-black px-8 py-3 hover:bg-retro-yellow hard-shadow-sm hover:translate-y-1"
          >
            <span className="font-pixel text-sm">KEMBALI KE MENU</span>
          </button>
        </div>
      )}
      
    </div>
  );
}

export default App;
