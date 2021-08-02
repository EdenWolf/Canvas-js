import './App.css';
import Circles from './pages/Circles';
import Gravity from './pages/Gravity';
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';


function App() {
  useLocation();
  
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
        <div className="container">
          <nav>
            <ul>
              <li><Link to="/Circles">Circles</Link></li>
              <li><Link to="/Gravity">Gravity</Link></li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/Circles" component={() => <Circles useWindowSize={useWindowSize} />} />
          <Route path="/Gravity" component={() => <Gravity useWindowSize={useWindowSize} />} />
          <Route path="/" component={() => <Circles useWindowSize={useWindowSize} />} />
        </Switch>
    </div>
  );
}

export default App;
