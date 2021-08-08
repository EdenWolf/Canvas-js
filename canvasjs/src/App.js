import "./App.css";
import Circles from "./pages/Circles";
import Gravity from "./pages/Gravity";
import Pong from "./pages/Pong";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { useState, useLayoutEffect } from "react";

function App() {
  useLocation();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  return (
    <div className="App">
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/Circles">Circles</Link>
            </li>
            <li>
              <Link to="/Gravity">Gravity</Link>
            </li>
            <li>
              <Link to="/Pong">Pong</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route
          path="/Circles"
          component={() => <Circles useWindowSize={useWindowSize} />}
        />
        <Route
          path="/Gravity"
          component={() => <Gravity useWindowSize={useWindowSize} />}
        />
        <Route
          path="/Pong"
          component={() => (
            <Pong
              useWindowSize={useWindowSize}
              randomIntFromRange={randomIntFromRange}
              getDistance={getDistance}
            />
          )}
        />
        <Route
          path="/"
          component={() => <Circles useWindowSize={useWindowSize} />}
        />
      </Switch>
    </div>
  );
}

export default App;
