import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Problem(props) {
  // State for the user's guess, the message to the user, and the flag details
  const [attempt, setAttempt] = useState('');
  const [message, setMessage] = useState('');
  const [currentFlag, setCurrentFlag] = useState('');
  const [correctCountry, setCorrectCountry] = useState('');

  // Fetch a new flag when the component mounts or the user requests the next flag
  const fetchCountryAndFlag = async () => {
    try {
      // Obtenir une liste de tous les pays avec leur drapeau
      const countriesResponse = await axios.get('https://restcountries.com/v2/all?fields=name,flags');
      const countries = countriesResponse.data;
  
      // Sélectionner un pays aléatoire de la liste
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  
      // Mettre à jour les states avec le pays et l'URL du drapeau
      setCurrentFlag(randomCountry.flags.png); 
      setCorrectCountry(randomCountry.name);
    } catch (error) {
      setMessage("There was an error fetching the country and flag.");
      console.error('Error fetching the country and flag:', error);
    }
  };
  

  useEffect(() => {
    fetchCountryAndFlag();
  }, []);

  const onChangeAttempt = (e) => {
    setAttempt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = attempt.trim().toLowerCase() === correctCountry.toLowerCase();
    props.addAttemptToHistory(attempt, correctCountry, isCorrect);
  
    if (isCorrect) {
      setMessage("Correct!");
    } else {
      setMessage(`Incorrect, the correct answer was ${correctCountry}. Try another flag!`);
    }
    setAttempt(''); // Clear the input field
  };

  const handleNext = (e) => {
    e.preventDefault();
    fetchCountryAndFlag(); // Fetch a new flag
    setAttempt(''); // Clear the input field
    setMessage(''); // Clear the message
  };

  return (
    <div className="App">
      <h3>Guess the country for this flag:</h3>
      <img src={currentFlag} alt="Flag" />

      <input 
        type="text" 
        name="attempt" 
        value={attempt} 
        onChange={onChangeAttempt} 
        placeholder="Enter country name" 
      />

      <button id="submit" onClick={handleSubmit}>Submit</button>
      <button onClick={handleNext}>Next Flag</button>

      <h3 id="message">{message}</h3>
    </div>
  );
}

export default Problem;
