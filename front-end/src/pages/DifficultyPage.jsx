import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import axios from 'axios';

const DifficultyPage = () => {
  const { category, setDifficulty, setQuestion, hasStarted, setScore } =
    useGame();
  const navigate = useNavigate();
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const selectDifficulty = async (level) => {
    setDifficulty(level);
    setScore(0);
    navigate('/loading');

    const amounts = [40, 30, 20, 10];
    let questions = [];

    for (const amount of amounts) {
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${level.toLowerCase()}&type=multiple`;

      try {
        console.log('Trying URL:', url);
        const res = await axios.get(url);

        if (res.data.response_code === 0 && res.data.results.length >= 10) {
          questions = res.data.results;
          break;
        }
      } catch (err) {
        console.warn(`Error fetching ${amount} questions:`, err.message);
      }
    }

    if (questions.length < 10) {
      alert(
        'Not enough questions available for this category and difficulty. Please try another.'
      );
      return;
    }

    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setQuestion(selected);
    navigate('/quiz');
  };

  useEffect(() => {
    if (!hasStarted) {
      navigate('/');
    }
  }, [hasStarted, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-100 px-2 sm:px-0">
      <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-gray-700 text-center">
        Select Difficulty
      </h2>
      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-xs sm:max-w-md">
        {difficulties.map((diff) => {
          let hover = '';
          if (diff === 'Easy') hover = 'hover:bg-green-400 hover:text-white';
          if (diff === 'Medium') hover = 'hover:bg-yellow-400 hover:text-white';
          if (diff === 'Hard') hover = 'hover:bg-red-400 hover:text-white';

          return (
            <button
              key={diff}
              className={`bg-gray-50 text-green-600 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-md px-8 sm:px-20 transition duration-300 transform hover:translate-y-1 ${hover}`}
              onClick={() => selectDifficulty(diff)}
            >
              {diff}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultyPage;
