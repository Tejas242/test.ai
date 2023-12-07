// Result.tsx
import React, { useEffect, useState } from 'react';

interface ResultProps {
  questions: string[];
}

const Result: React.FC<ResultProps> = ({ questions }) => {
  const [displayedQuestions, setDisplayedQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typewriterInterval = setInterval(() => {
      // Show one question at a time with the typewriter effect
      setDisplayedQuestions((prevQuestions) => {
        const nextIndex = currentIndex + 1;
        if (nextIndex <= questions.length) {
          setCurrentIndex(nextIndex);
          return [...prevQuestions, questions[currentIndex]];
        }
        clearInterval(typewriterInterval);
        return prevQuestions;
      });
    }, 100); // Adjust the interval based on your preference or the desired typing speed

    // Clean up the interval when the component is unmounted
    return () => clearInterval(typewriterInterval);
  }, [currentIndex, questions]);

  return (
    <div className="result-container mt-8">
      {displayedQuestions.map((question, index) => (
        <div key={index} className="bg-white p-4 rounded shadow-md">
          {question}
        </div>
      ))}
    </div>
  );
};

export default Result;
