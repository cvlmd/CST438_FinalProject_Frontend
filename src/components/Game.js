import React from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Problem from './Problem'; 
import ScoreHistoryComponent from './History'; 

function Game() {
  const history = useHistory();
  const linkStyle = {
    padding: '10px 20px',
    margin: '5px',
    background: 'blue',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  };

  const navigateToHistory = () => {
    history.push('/game/history');
  };

  return (
    <div>
      <nav>
        <ul style={{ listStyleType: 'none', textAlign: 'center', padding: 0 }}>
          <li style={{ display: 'inline' }}>
            <Link to="/game" style={linkStyle}>Quiz</Link>
          </li>
          <li style={{ display: 'inline' }}>
            {/* Using button to navigate to history */}
            <button onClick={navigateToHistory} style={linkStyle}>History</button>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/game">
          <Problem />
        </Route>
        <Route path="/game/history">
          <ScoreHistoryComponent />
        </Route>
      </Switch>
    </div>
  );
}

export default Game;
