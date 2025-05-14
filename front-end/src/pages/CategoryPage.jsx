import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useEffect } from 'react';
import Icons from '../components/Icons';

const CategoryPage = () => {
  const { hasStarted, setCategory } = useGame();
  const navigate = useNavigate();

  const categories = [
    { name: 'History', id: 23 },
    { name: 'Geography', id: 22 },
    { name: 'Science and Nature', id: 17 },
    { name: 'Games', id: 15 },
    { name: 'Sports', id: 21 },
    { name: 'Movies', id: 11 },
  ];

  useEffect(() => {
    if (!hasStarted) {
      navigate('/');
    }
  }, [hasStarted, navigate]);

  const selectCategory = (cat) => {
    setCategory(cat.id);
    navigate('/difficulty');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-gray-800 text-center">
        Select Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="bg-white text-gray-800 py-4 px-2 sm:py-6 sm:px-6 w-full h-28 sm:h-36 rounded-xl text-base sm:text-lg shadow-md hover:bg-blue-200 hover:scale-105 flex flex-col items-center justify-start transform duration-300"
            onClick={() => selectCategory(cat)}
          >
            <div className="mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10">
              <Icons category={cat.name} size={48} />
            </div>
            <span className="mt-1 sm:mt-2 text-base sm:text-xl font-semibold">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
