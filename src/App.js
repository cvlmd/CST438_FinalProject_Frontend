import './App.css';
import React, {useState, useEffect} from 'react';
import History from './components/History';
import Problem from './components/Problem';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './components/Login'; 



function App() {


  const [message, setMessage] = useState('');
  const [factors, setFactors] = useState({a:41, b:26});
  const [history, setHistory] = useState([]);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check session storage for JWT token
    const jwtToken = sessionStorage.getItem("jwt");
    
    // Set authenticated state based on the presence of the token
    setAuthenticated(jwtToken !== null);
  }, []);


  const fetchProblem = () => {
    setMessage(''); 
    fetch('http://localhost:8080/multiplication/new')
    .then(response => response.json()) 
    .then(data => {
      setFactors({a:data.factorA, b:data.factorB});
    })
    .catch(err => console.log(err));
   }


   const postAttempt = (attempt, alias) => {
    fetch ('http://localhost:8080/result', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({factorA:factors.a, 
                            factorB:factors.b, 
                            alias: alias, 
                            attempt:attempt})
    })
    .then(response => response.json())
    .then(data => {
      if (data.correct) {
        setMessage('Correct.');
      } else {
        setMessage('Incorrect. Try again.');
      }
      if (alias!=='') fetchHistory(alias);
    })
    .catch(err => console.error(err));
  }


  const fetchHistory = (alias) => {
    fetch(`http://localhost:8080/result/${alias}`)
    .then(response => response.json())
    .then(data => setHistory(data))
    .catch(err => console.error(err));    
}


return (
  <div className="App">
    <BrowserRouter>
      <Link to='/'>Play Game</Link>{' | '}<Link to='/history'>History</Link>
      <Switch>
        <Route exact path='/'>
          { isAuthenticated ? 
            <Problem factors={factors} message={message} postAttempt={fetchProblem} />
            : <Redirect to="/login" /> }
        </Route>
        <Route path='/history'>
          { isAuthenticated ? <History data={history} /> : <Redirect to="/login" /> }
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
}

export default App;
