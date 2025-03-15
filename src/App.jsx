import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import bahamasPic from './assets/bahamas-picture.jpg';
import chinaPic from './assets/china-picture.jpg';
import mexicoPic from './assets/mexico-picture.jpg';

const App = () => {
  const cards = [
    { question: "What is the powerhouse of the cell?", answer: "Mitochondria", category: "Biology" },
    { question: "What is the chemical symbol for water?", answer: "H2O", category: "Chemistry" },
    { question: "What is the speed of light?", answer: "299,792,458 meters per second", category: "Physics" },
    { question: "What is the boiling point of water?", answer: "100°C", category: "Chemistry" },
    { question: "What is the binary representation of the number 10?", answer: "1010", category: "Computer Science" },
    { question: "What is the process by which plants make their food?", answer: "Photosynthesis", category: "Biology" },
    { question: "What is the formula for calculating force?", answer: "Force = Mass x Acceleration", category: "Physics" },
    { question: "What is the main programming language used for web development?", answer: "JavaScript", category: "Computer Science" },
    { question: "What is the largest organ in the human body?", answer: "Skin", category: "Biology" },
    { question: "What is the atomic number of carbon?", answer: "6", category: "Chemistry" },
    { question: "What country is this?", answer: "Mexico", image: mexicoPic, category: "Geography" },
    { question: "What country is this?", answer: "China", image: chinaPic, category: "Geography" },
    { question: "What country is this?", answer: "The Bahamas", image: bahamasPic, category: "Geography" }
  ];

  const [next, setNext] = useState(0);
  const [flip, setFlip] = useState(false);
  const [visitedCards, setVisitedCards] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(cards[next].category);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const flipCard = () => {
    setFlip(!flip);
  };

  const nextPage = () => {
    setNext((prev) => (prev + 1) % cards.length);
    setFlip(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const backPage = () => {
    setNext((prev) => (prev - 1 + cards.length) % cards.length);
    setFlip(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const shuffleCards = () => {
    let randomCard;
    do {
      randomCard = Math.floor(Math.random() * cards.length);
    } while (visitedCards.includes(randomCard));

    setVisitedCards([...visitedCards, randomCard]);
    setNext(randomCard);
    setCurrentCategory(cards[randomCard].category);
    setFlip(false);
    setUserAnswer('');
    setIsCorrect(null);

    if (visitedCards.length === cards.length - 1) {
      setVisitedCards([]);
    }
  };

  const handleInput = (e) => {
    setUserAnswer(e.target.value);
  };

  const onCheckAnswer = (e) => {
    e.preventDefault();
    const correctAnswer = cards[next].answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();

    if (userAnswerLower === '') {
      setIsCorrect(false); // handles empty input
      setCurrentStreak(0);
      return;
    }

    const isAnswerCorrect = (correctAnswer.includes(userAnswerLower) || userAnswerLower.includes(correctAnswer));

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setCurrentStreak((prev) => prev + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const markAsMastered = () => {
    setMasteredCards([...masteredCards, cards[next]]);
    setNext((prev) => (prev + 1) % cards.length); // Move to the next card
    setFlip(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  return (
    <div className="App">
      <div className="fullscreen-background"></div>
      <div className="content">
        <Card
          onClick={flipCard}
          question={cards[next].question}
          info={flip ? cards[next].answer : ''}
          flip={flip}
          cardNum={cards.length}
          image={cards[next].image}
          category={cards[next].category}
        />
        <form onSubmit={onCheckAnswer}>
          <input
            type="text"
            value={userAnswer}
            onChange={handleInput}
            placeholder="Type your answer here..."
            className={`answer-input ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}
          />
          <button type="submit">Check Answer</button>
        </form>
        {isCorrect !== null && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct! 🎉' : 'Incorrect! ❌'}
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={backPage}>←</button>
          <button onClick={nextPage}>→</button>
          <button onClick={shuffleCards}>Shuffle</button>
        </div>
        <div className="streak-container">
          <p>Current Streak: {currentStreak}</p>
          <p>Longest Streak: {longestStreak}</p>
        </div>
        <button onClick={markAsMastered} className="master-button">
          Mark as Mastered
        </button>
        <div className="key-container">
          <p>Category: <span className={`category ${currentCategory.toLowerCase().replace(/\s+/g, '-')}`}>{currentCategory}</span></p>
        </div>
      </div>
    </div>
  );
};

export default App;