import { NavLink } from 'react-router-dom'
import { AuthCheck } from 'reactfire'

import { Login, Logout } from './Auth'
import { useIsAdmin } from '../pages/Admin'

const Nav = ():JSX.Element => {

  return (
    <AuthCheck fallback={<Login />}>
      <nav
        className="flex flex-col mx-8 my-4 w-64 min-w-min text-center divide-y divide-gray-500 divide-opacity-50"
      >
        <NavLink
          to="/episodes"
          className="navlink"
          activeClassName="tracking-widest"
        >
          Episodes
        </NavLink>
        <AuthCheck fallback={null}>
          {<AdminNavLink />}
        </AuthCheck>
        <Logout />
      </nav>
    </AuthCheck>
  )
}

export default Nav

const AdminNavLink = ():JSX.Element | null => {
  const isAdmin = useIsAdmin()
  return isAdmin ? (
    <NavLink
      to="/admin"
      className="navlink"
      activeClassName="tracking-widest"
    >
      Admin
    </NavLink>
  ) : null;
}
