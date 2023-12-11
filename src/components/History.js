import './History.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScoreHistoryComponent() {
  const [scoreHistory, setScoreHistory] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/score/history', {
      params: {
        username: 'user', 
      },
    })
    .then((response) => {
      console.log('Score history data:', response.data); // Check the data received
      setScoreHistory(response.data);
    })
    .catch((error) => {
      console.error('Error fetching score history:', error);
    });
  }, []);
  

  // Inside the History component
return (
    <div className="score-history">
      <h2>Score History</h2>
      <ul>
      {scoreHistory.map((scoreItem, index) => (

          <li key={index}>
            Attempt ID: {scoreItem.attemptId}<br />
            User Guess: {scoreItem.userGuess}<br />
            Correct Country: {scoreItem.correctCountry}<br />
            Is Correct: {scoreItem.isCorrect ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default ScoreHistoryComponent;
