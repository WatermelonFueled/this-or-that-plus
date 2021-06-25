import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, AuthCheck } from 'reactfire'

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
  const auth = useAuth;

  return (
    <button
      onClick={}
      type="button"
      className="navlink"
    >
      Logout
    </button>
  )
}
