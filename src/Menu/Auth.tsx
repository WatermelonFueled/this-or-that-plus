import { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth } from 'reactfire'

export const Login = ():JSX.Element => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      // auth.FacebookAuthProvider.PROVIDER_ID,
      auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result) => {
        return false // Avoid redirects after sign-in.
      },

    }
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    </div>
  )
}

export const Logout = ():JSX.Element => {
  const auth = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  return showConfirm ? (
    <div>
      <p className="p-1 italic text-center text-md text-gray-700 dark:text-gray-300">
        Are you sure?
      </p>
      <div
        className="flex flex-row flex-nowrap justify-center gap-4 text-xl"
      >
        <button
          onClick={() => auth.signOut()}
          type="button"
          className="p-1 text-purple-700 dark:text-purple-300 transition transform hover:-translate-y-1 focus:-translate-y-1"
        >
          Yes, Logout
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          type="button"
          className="p-1 text-gray-900 dark:text-gray-300 transition transform hover:-translate-y-1 focus:-translate-y-1"
        >
          Nevermind
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={() => setShowConfirm(true)}
      type="button"
      className="navlink"
    >
      Logout
    </button>
  )
}
