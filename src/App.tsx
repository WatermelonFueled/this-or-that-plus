import { useState } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import "firebase/firestore";
import "firebase/auth";
import {
  AuthCheck,
  FirebaseAppProvider,
  // useFirestoreDocData,
  // useFirestore
} from "reactfire";
import { XIcon, MenuIcon } from '@heroicons/react/outline'

import EpisodePage from './pages/EpisodePage';
import { Login, Logout } from './Auth'

const firebaseConfig = {
  apiKey: "AIzaSyBrsa7k3ajtgKbUqS34kWf0y69ZEXSy0-Q",
  authDomain: "thisorthat-lol.firebaseapp.com",
  databaseURL: "https://thisorthat-lol.firebaseio.com",
  projectId: "thisorthat-lol",
  storageBucket: "thisorthat-lol.appspot.com",
  messagingSenderId: "434578118432",
  appId: "1:434578118432:web:cc3e3281cfd742cf94e945",
  measurementId: "G-BT0MKTC0XM"
};

const App = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <FirebaseAppProvider
      firebaseConfig={firebaseConfig}
    >
      <BrowserRouter>
        <div className="relative w-full min-h-screen">
          <main className="w-full max-w-7xl mx-auto">
            <Switch>
              <Route path="/episodes">
              </Route>
              <Route path="/:episode">
                <EpisodePage />
              </Route>
            </Switch>
          </main>
          <div
            className={`absolute w-screen h-screen inset-0 bg-purple-200 bg-opacity-90 ${showMenu ? 'grid' : 'hidden'}`}
          >
            <div className="max-w-full self-center justify-self-center">
              <button
                className="block ml-auto"
                type="button"
                onClick={() => setShowMenu(false)}
              >
                <XIcon className="menu-icon" />
              </button>
              <AuthCheck fallback={<Login />}>
                <nav
                  className="flex flex-col mx-8 my-4 w-64 min-w-min text-center divide-y divide-gray-500 divide-opacity-50"
                >
                  <NavLink
                    to="/episodes"
                    className="navlink"
                    activeClassName="tracking-widest"
                  >
                    episodes
                  </NavLink>
                  <NavLink
                    to="/episodes"
                    className="navlink"
                    activeClassName="tracking-widest"
                  >
                    episodes
                  </NavLink>
                  <Logout />
                </nav>
              </AuthCheck>
            </div>
          </div>
          <button
            className={`fixed right-6 bottom-6 ${showMenu ? 'opacity-0' : ''}`}
            type="button"
            onClick={() => setShowMenu(true)}
          >
            <MenuIcon className="menu-icon bg-purple-300 bg-opacity-50 hover:bg-opacity-70" />
          </button>
        </div>
      </BrowserRouter>
    </FirebaseAppProvider>
  );
}

export default App;
