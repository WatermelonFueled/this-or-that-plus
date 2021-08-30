import { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import { FirebaseAppProvider } from 'reactfire'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Admin from './pages/Admin'
import Episode from './pages/Episode'
import Episodes from './pages/Episodes'
import Privacy from './pages/Privacy'

import Menu from './Menu/Menu'
import Background from './components/Background'
import { ScrollToTopOnNavigate } from './util'
import Footer from './Menu/Footer'
import User from './pages/User'

const queryClient = new QueryClient()

const firebaseConfig = {
  apiKey: 'AIzaSyBrsa7k3ajtgKbUqS34kWf0y69ZEXSy0-Q',
  authDomain: 'auth.thisorthatplus.com',
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
                <Route path="/user">
                  <User />
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
          <Footer />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </FirebaseAppProvider>
  )
}

export default App
