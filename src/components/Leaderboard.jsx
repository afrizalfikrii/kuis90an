import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { getTopScores } from '../firebase/leaderboard';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const topScores = await getTopScores(10);
      setScores(topScores);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Gagal memuat leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (rank) => {
    if (rank === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 2) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="font-pixel text-sm">#{rank + 1}</span>;
  };

  if (loading) {
    return (
      <div className="bg-white border-4 border-black p-8 hard-shadow">
        <p className="font-retro text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-retro-pink border-4 border-black p-8 hard-shadow">
        <p className="font-retro text-xl text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black p-6 hard-shadow relative">
      <div className="absolute -top-4 left-4 bg-retro-yellow border-2 border-black px-3 py-1">
        <span className="font-pixel text-xs">TOP 10 PLAYERS</span>
      </div>

      <h2 className="font-pixel text-2xl mb-6 mt-2 text-center">LEADERBOARD</h2>

      {scores.length === 0 ? (
        <p className="font-retro text-xl text-center text-gray-500">Belum ada skor. Jadilah yang pertama!</p>
      ) : (
        <div className="space-y-2">
          {scores.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 border-2 border-black ${
                index === 0 ? 'bg-retro-yellow' : index === 1 ? 'bg-gray-200' : index === 2 ? 'bg-orange-100' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 flex justify-center">
                  {getMedalIcon(index)}
                </div>
                <span className="font-retro text-xl font-bold">{entry.username}</span>
              </div>
              <span className="font-pixel text-lg">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
