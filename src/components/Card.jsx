import React from 'react';
import '../App.css';

const Card = ({ question, info, flip, onClick, cardNum, image, category }) => {
  return (
    <div className={`card ${flip ? 'flipped' : ''}`} onClick={onClick}>
        <h1>Quiz Flashcards</h1>
        <h3>Test your knowledge!</h3>
        <h4>Number of cards: {cardNum}</h4>
      <div className={`container ${category.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="card-inner">
          <div className="card-front">
            <h2>{question}</h2>
            {image && <img src={image} alt={question} />}
          </div>
          <div className="card-back">
            <p><b>{info}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;