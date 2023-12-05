import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Problem(props) {
  const [attempt, setAttempt] = useState('');
  const [message, setMessage] = useState('');
  const [currentFlag, setCurrentFlag] = useState({ url: '', country: '' });

  useEffect(() => {
    fetchFlag();
  }, []);

  const fetchFlag = async () => {
    console.log("Fetching flag...");
    try {
      const response = await axios.get('http://localhost:8080/quiz/flag');
      console.log("Response received:", response.data);
      setCurrentFlag({ url: response.data.flagUrl, country: response.data.name });
    } catch (error) {
      console.error('Error fetching flag:', error);
    }
  };

  const onChangeAttempt = (e) => {
    setAttempt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attempt.trim().toLowerCase() === currentFlag.country.toLowerCase()) {
      setMessage("Correct!");
    } else {
      setMessage(`Incorrect, the correct answer was ${currentFlag.country}.`);
    }
    setAttempt('');
    await fetchFlag();
  };

  return (
    <div className="Problem" style={{
      maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', backgroundColor: 'white'
    }}>
      <h3 style={{ textAlign: 'center' }}>Guess the country of the flag:</h3>
      <div style={{
        width: '500px', height: '300px', display: 'flex', justifyContent: 'center',
        alignItems: 'center', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#f0f0f0',
        border: '1px solid #ddd'
      }}>
        <img src={currentFlag.url} alt="Flag" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="text" 
          value={attempt} 
          onChange={onChangeAttempt} 
          placeholder="Enter country name" 
          style={{ marginBottom: '10px', padding: '10px', width: '100%', maxWidth: '500px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', maxWidth: '500px' }}>Submit</button>
      </form>
      {message && <div style={{ textAlign: 'center', maxWidth: '500px' }}>{message}</div>}
    </div>
  );
}

export default Problem;
