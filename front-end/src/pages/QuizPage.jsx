import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { X, Check } from 'lucide-react';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

const QuizPage = () => {
  const { hasStarted, question, score, setScore } = useGame();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const currentQuestion = question[currentIndex];

  useEffect(() => {
    if (!hasStarted) {
      navigate('/');
    }
  }, [hasStarted, navigate]);

  useEffect(() => {
    if (!currentQuestion) return;
    const answer = shuffle([
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ]);
    setOptions(answer);
  }, [currentQuestion]);

  if (!question || !question.length) {
    navigate('/');
    return null;
  }
  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (currentIndex + 1 < question.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        navigate('/result');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground bg-amber-100">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg transition-transform transform bg-white">
        <div className="text-xl font-extrabold mb-4 text-purple-300">
          Question {currentIndex + 1} of {question.length}
        </div>

        <p className="text-2xl font-semibold mb-6 text-gray-800">
          {decodeHTML(currentQuestion.question)}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {options.map((option, index) => {
            const isCorrect =
              selected && option === currentQuestion.correct_answer;
            const isWrong =
              selected && option !== currentQuestion.correct_answer;

            return (
              <button
                key={index}
                onClick={() => !selected && handleAnswer(option)}
                className={`w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition duration-300 transform hover:translate-y-1
                  ${
                    selected
                      ? isCorrect
                        ? 'bg-green-400 text-white'
                        : isWrong
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-200 text-gray-500'
                      : 'bg-blue-100 hover:bg-blue-300 text-gray-800'
                  }
                `}
              >
                {decodeHTML(option)}
                {selected && isCorrect && (
                  <span className="inline-block ml-2 align-middle text-white">
                    <Check strokeWidth={2.75} size={22} />
                  </span>
                )}
                {selected && isWrong && (
                  <span className="inline-block ml-2 align-middle text-white">
                    <X strokeWidth={2.75} size={22} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-6 text-right text-green-700 font-semibold">
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
