import './App.css';
import Circles from './pages/Circles';
import Gravity from './pages/Gravity';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

function App() {
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
          <Route path="/Circles" component={Circles} />
          <Route path="/Gravity" component={Gravity} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
