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
    <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Select Category</h2>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="bg-white text-gray-800 py-6 px-6 w-48 h-36 rounded-xl text-lg shadow-md hover:bg-blue-200 hover:scale-110 flex flex-col items-center justify-start transform duration-300"
            onClick={() => selectCategory(cat)}
          >
            <div className="mb-3 h-10 w-10">
              <Icons category={cat.name} size={100} />
            </div>
            <span className="mt-2 text-xl font-semibold">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
