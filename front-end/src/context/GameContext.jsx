import { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [question, setQuestion] = useState([]);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <GameContext.Provider
      value={{
        category,
        setCategory,
        difficulty,
        setDifficulty,
        question,
        setQuestion,
        score,
        setScore,
        hasStarted,
        setHasStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
