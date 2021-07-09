import { XIcon, MenuIcon } from '@heroicons/react/outline'
import Nav from './Nav'

const Menu = (
  { showMenu, setShowMenu }: {
    showMenu: boolean, setShowMenu: (updated: boolean) => void
  }
): JSX.Element => (
  <>
    <div
      className={`absolute w-screen h-screen inset-0 bg-purple-200 bg-opacity-90 dark:bg-purple-900 ${showMenu ? 'grid' : 'hidden'}`}
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
      className={`fixed right-6 bottom-6 group rounded-full outline-none transition focus:ring-4 ring-purple-500 dark:ring-gray-300 bg-purple-300 bg-opacity-50 hover:bg-opacity-70 ${showMenu ? 'opacity-0' : ''}`}
      type="button"
      onClick={() => setShowMenu(true)}
    >
      <MenuIcon className="menu-icon" />
    </button>
  </>
)

export default Menu
