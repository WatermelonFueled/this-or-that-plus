import { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/auth'
import {
  AuthCheck,
  FirebaseAppProvider,
} from 'reactfire'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import CONFIG from './config.json'

import Admin from './pages/Admin'
import Episode from './pages/Episode'

import Episodes from './pages/Episodes'
import Menu from './Menu/Menu'

const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <FirebaseAppProvider
      firebaseConfig={CONFIG.firebaseConfig}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="relative w-full min-h-screen dark:bg-gray-900 dark:text-gray-100">
            <main className="w-full max-w-7xl mx-auto">
              <Switch>
                <Route path="/admin">
                  <AuthCheck fallback={<Redirect to="/" />}>
                    <Admin />
                  </AuthCheck>
                </Route>
                <Route path="/episodes">
                  <Episodes />
                </Route>
                <Route path="/:episodeName">
                  <Episode />
                </Route>
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
