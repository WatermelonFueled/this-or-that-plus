import { Redirect } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import Loading from "../../components/Loading";
import DeleteAccount from "./DeleteAccount";
import Stats from "./Stats"


const User = () => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') return <Loading />

  return signInCheckResult.signedIn ? (
    <div className="max-w-6xl mx-auto pb-8 grid gap-16">
      <h1 className="heading p-4 border-b border-purple-500">
        User
      </h1>
      <Stats />
      <DeleteAccount />
    </div>
  ) : <Redirect to="/" />;
}

export default User
