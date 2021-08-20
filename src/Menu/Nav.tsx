import { NavLink } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'

import { Login, Logout } from './Auth'
import { isAdmin } from '../pages/Admin'
import Loading from '../components/Loading'


const Nav = (): JSX.Element | null => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') return <Loading />

  return signInCheckResult.signedIn ? (
    <nav
      className="flex flex-col mx-8 my-4 w-64 min-w-min text-center divide-y divide-gray-500 divide-opacity-50"
    >
      <NavLink
        to="/episodes"
        className="navlink"
        activeClassName="tracking-widest font-bold"
      >
        Episodes
      </NavLink>
      <NavLink
        to="/user"
        className="navlink"
        activeClassName="tracking-widest font-bold"
      >
        User
      </NavLink>
      {isAdmin(signInCheckResult.user?.uid) && (
        <NavLink
          to="/admin"
          className="navlink"
          activeClassName="tracking-widest font-bold"
        >
          Admin
        </NavLink>
      )}
      <Logout />
    </nav>
  ) : (
    <Login />
  )
}

export default Nav
