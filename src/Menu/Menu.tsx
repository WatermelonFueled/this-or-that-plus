import { XIcon, MenuIcon } from '@heroicons/react/outline'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav'

const Menu = (
  { showMenu, setShowMenu }: {
    showMenu: boolean, setShowMenu: (updated: boolean) => void
  }
): JSX.Element => {
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (showMenu) setShowMenu(false) }, [pathname]);

  return (
    <>
      <div
        className={`fixed z-40 w-screen h-screen inset-0 bg-purple-200 bg-opacity-90 dark:bg-purple-900 ${showMenu ? 'grid' : 'hidden'}`}
      >
        <div className="max-w-full self-center justify-self-center">
          <button
            className="block ml-auto group"
            type="button"
            onClick={() => setShowMenu(false)}
          >
            <XIcon className="menu-icon" />
          </button>
          <Nav />
        </div>
      </div>
      <button
        className={`fixed z-40 right-6 bottom-6 group rounded-full outline-none transition focus:ring-4 ring-purple-500 dark:ring-gray-300 bg-purple-500 bg-opacity-60 hover:bg-opacity-100 ${showMenu ? 'opacity-0' : ''}`}
        type="button"
        onClick={() => setShowMenu(true)}
      >
        <MenuIcon className="menu-icon" />
      </button>
    </>
  )
}


export default Menu
