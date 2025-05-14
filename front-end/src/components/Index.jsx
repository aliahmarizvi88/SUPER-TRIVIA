import React from 'react';
import TitlePage from '../pages/TitlePage';
import CategoryPage from '../pages/CategoryPage';
import DifficultyPage from '../pages/DifficultyPage';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';
import ScoresPage from '../pages/ScoresPage';
import LoadingPage from '../pages/LoadingPage';

import { GameProvider } from '../context/GameContext';
import { Routes, Route } from 'react-router-dom';

const Index = () => {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/difficulty" element={<DifficultyPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="/Loading" element={<LoadingPage />} />
      </Routes>
    </GameProvider>
  );
};

export default Index;
