import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type AppProps = {};

const App = (props: AppProps): JSX.Element => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <BrowserRouter>
      <Switch>
        <Route path="/:title">

        </Route>
        <Route path="/stats">

        </Route>
        <Route path="/list">
          
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
