import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EpisodePage from './pages/EpisodePage';

type AppProps = {};

const App = (props: AppProps): JSX.Element => (
  <div className="w-full min-h-screen">
    <main className="w-full max-w-7xl mx-auto">
      <BrowserRouter>
        <Switch>
          <Route path="/stats">

          </Route>
          <Route path="/list">
            <p>a</p>
          </Route>
          <Route path="/:episode">
            <EpisodePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  </div>
);

export default App;
