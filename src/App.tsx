import { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import { FirebaseAppProvider } from 'reactfire'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import CONFIG from './config.json'

import Admin from './pages/Admin'
import Episode from './pages/Episode'

import Episodes from './pages/Episodes'
import Menu from './Menu/Menu'
import Background from './components/Background'

const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <FirebaseAppProvider
      firebaseConfig={CONFIG.firebaseConfig}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="relative w-full min-h-screen dark:text-gray-100">
            <Background />
            <main className="relative max-w-full mx-auto z-10">
              <Switch>
                <Route path="/admin">
                  <Admin />
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
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </FirebaseAppProvider>
  )
}

export default App
