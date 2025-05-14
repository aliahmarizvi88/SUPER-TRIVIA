import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
  const navigate = useNavigate();
  const { score, category, difficulty, setHasStarted, hasStarted, setScore } =
    useGame();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!playerName.trim()) {
      setError('Please Enter your Name');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await axios.post(
        'https://trivia-backend-n29m.onrender.com/api/submitScore',
        {
          playerName,
          category,
          difficulty,
          score,
        }
      );

      setLoading(false);
      setHasStarted(false);
      setScore(0);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError('Failed to submit score. Try again later.', error);
    }
  };

  useEffect(() => {
    if (!hasStarted) {
      navigate('/');
    }
  }, [hasStarted, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-lime-400 to-yellow-300 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Game Over!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Your Score: <span className="font-bold text-green-600">{score}</span>
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!playerName.trim() || loading}
          className={`w-full py-2 text-white font-semibold rounded transition-all duration-200  ${
            !playerName.trim() || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 transform hover:translate-y-1'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Score'}
        </button>
      </div>
      <p className="py-10 text-sm text-gray-500">
        Note: This is only to save your name and score in database for other
        players
      </p>
    </div>
  );
};

export default ResultPage;
