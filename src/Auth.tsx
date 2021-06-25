import { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth } from 'reactfire'

export const Login = ():JSX.Element => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
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
      <p className="p-1 text-gray-700 italic text-center text-md">
        Are you sure?
      </p>
      <div
        className="flex flex-row flex-nowrap justify-center gap-1 text-xl"
      >
        <button
          onClick={() => auth.signOut()}
          type="button"
          className="p-1 text-purple-700 transition transform hover:-translate-y-1 focus:-translate-y-1"
        >
          Yes, Logout
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          type="button"
          className="p-1 text-gray-900 transition transform hover:-translate-y-1 focus:-translate-y-1"
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
