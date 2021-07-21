import { useState } from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import { FirebaseAppProvider } from 'reactfire'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Admin from './pages/Admin'
import Episode from './pages/Episode'

import Episodes from './pages/Episodes'
import Menu from './Menu/Menu'
import Background from './components/Background'
import Privacy from './pages/Privacy'
import { ScrollToTopOnNavigate } from './util'

const queryClient = new QueryClient()

const firebaseConfig = {
  apiKey: 'AIzaSyBrsa7k3ajtgKbUqS34kWf0y69ZEXSy0-Q',
  authDomain: 'thisorthat-lol.firebaseapp.com',
  databaseURL: 'https://thisorthat-lol.firebaseio.com',
  projectId: 'thisorthat-lol',
  storageBucket: 'thisorthat-lol.appspot.com',
  messagingSenderId: '434578118432',
  appId: '1:434578118432:web:cc3e3281cfd742cf94e945',
  measurementId: 'G-BT0MKTC0XM'
}

const App = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <FirebaseAppProvider
      firebaseConfig={firebaseConfig}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <ScrollToTopOnNavigate />
          <div className="relative w-full min-h-screen dark:text-gray-100">
            <Background />
            <main className="relative max-w-full mx-auto z-10">
              <Switch>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/privacy">
                  <Privacy />
                </Route>
                <Route path="/episodes">
                  <Episodes />
                </Route>
                <Route path="/:episodeName">
                  <Episode />
                </Route>
                <Redirect
                  from="/"
                  exact
                  to="/episodes"
                />
              </Switch>
            </main>
            <Menu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </div>
          <footer
            className="relative h-72 flex flex-row justify-between items-center px-6 sm:px-18 md:px-24 lg:px-36 gap-6 bg-gray-700 text-white"
          >
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/privacy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <p className="text-gray-300">
                  &copy; David Park
                </p>
              </li>
            </ul>
            <div className="flex flex-row gap-4">
              <a
                href="https://twitter.com/WatermelonFuel"
                target="_blank"
                rel="noreferrer"
                className="hover:animate-pulse"
              >
                <img
                  src="/media/social/twitter-white.svg"
                  alt="🐤"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://github.com/WatermelonFueled"
                target="_blank"
                rel="noreferrer"
                className="hover:animate-pulse"
              >
                <img
                  src="/media/social/GitHub-Mark-Light-64px.png"
                  alt="🐙"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </footer>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </FirebaseAppProvider>
  )
}

export default App
