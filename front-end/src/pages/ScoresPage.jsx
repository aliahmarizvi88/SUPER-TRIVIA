import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const categoriesMap = {
  23: 'History',
  22: 'Geography',
  17: 'Science and Nature',
  15: 'Games',
  21: 'Sports',
  11: 'Movies',
};
const ScoresPage = () => {
  const [score, setScore] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchScore = async () => {
    try {
      const res = await axios.get(
        'https://trivia-backend-n29m.onrender.com/api/displayScore'
      );
      const sorted = res.data.sort((a, b) => b.score - a.score);
      setScore(sorted);
    } catch (error) {
      console.log('Failed to fetch score:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Leaderboard
        </h2>

        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : score.length === 0 ? (
          <p className="text-center text-gray-600">No Score Found</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border-b">Player</th>
                <th className="p-3 border-b">Score</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Difficulty</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {score.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{entry.playerName}</td>
                  <td className="p-3 border-b font-semibold">{entry.score}</td>
                  <td className="p-3 border-b">
                    {categoriesMap[entry.category] || entry.category}
                  </td>
                  <td className="p-3 border-b capitalize">
                    {entry.difficulty}
                  </td>
                  <td className="p-3 border-b text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-center mt-6">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoresPage;
