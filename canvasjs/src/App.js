import './App.css';
import Circles from './pages/Circles';
import Gravity from './pages/Gravity';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';


function App() {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  return (
    <div className="App">
      <Router>
        <div className="container">
          <nav>
            <ul>
              <li><Link to="/Circles">Circles</Link></li>
              <li><Link to="/Gravity">Gravity</Link></li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/" exact component={() => <Circles useWindowSize={useWindowSize} />} />
          <Route path="/Circles" component={() => <Circles useWindowSize={useWindowSize} />} />
          <Route path="/Gravity" component={() => <Gravity useWindowSize={useWindowSize} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
