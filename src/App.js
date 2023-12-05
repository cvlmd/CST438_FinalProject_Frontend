import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/game" component={Game} />
          <Redirect from="/" to="/login" /> {/* Redirect to /login if no other route matches */}
        </Switch>
      </div>
    </Router>
  );
}


export default App;
