import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CircleArrowRight, Gamepad2 } from 'lucide-react';

const TitlePage = () => {
  const navigate = useNavigate();
  const { setHasStarted } = useGame();

  const handleStart = () => {
    setHasStarted(true);
    navigate('/category');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h1 className="text-6xl font-bold mb-10">SUPER TRIVIA</h1>
      <div className=" my-8 border-b-3 border-red-400 px-20">
        <button
          className="bg-white text-indigo-600 px-10 py-3 rounded-lg shadow-lg text-xl font-semibold mb-4 hover:bg-gray-200 hover:translate-x-3 transform duration-300 flex items-center space-x-6"
          onClick={handleStart}
        >
          <span>Start Game</span>
          <CircleArrowRight size={28} color="#3949ab" strokeWidth={2.5} />
        </button>
      </div>

      <button
        className="bg-white text-indigo-600 px-8 py-3 rounded-lg shadow-lg text-xl font-semibold hover:bg-gray-200 flex items-center space-x-6 transform duration-300 hover:scale-120"
        onClick={() => navigate('/scores')}
      >
        <span>View Scores</span>
        <Gamepad2 size={28} color="#3949ab" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default TitlePage;
