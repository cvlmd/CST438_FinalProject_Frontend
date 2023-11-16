import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Problem(props) {
  // State for the user's guess, the message to the user, and the flag details
  const [attempt, setAttempt] = useState('');
  const [message, setMessage] = useState('');
  const [currentFlag, setCurrentFlag] = useState('');
  const [correctCountry, setCorrectCountry] = useState('');

  // Fetch a new flag when the component mounts or the user requests the next flag
  const fetchFlag = async () => {
    try {
      // Replace 'COUNTRY_CODE' with the API's method of selecting a random country
      const response = await axios.get('https://flagsapi.com/random/flat/64.png');
      setCurrentFlag(response.data.flagUrl); // Set the flag image URL
      setCorrectCountry(response.data.countryName); // Set the correct country name
    } catch (error) {
      setMessage("There was an error fetching the flag.");
      console.error('Error fetching the flag:', error);
    }
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  const onChangeAttempt = (e) => {
    setAttempt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attempt.trim().toLowerCase() === correctCountry.toLowerCase()) {
      setMessage("Correct!");
    } else {
      setMessage(`Incorrect, the correct answer was ${correctCountry}. Try another flag!`);
    }
    setAttempt(''); // Clear the input field
  };

  const handleNext = (e) => {
    e.preventDefault();
    fetchFlag(); // Fetch a new flag
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
