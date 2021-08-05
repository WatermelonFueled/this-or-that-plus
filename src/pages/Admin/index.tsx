import { Redirect } from "react-router-dom"
import { useSigninCheck } from "reactfire"
import NewEpisodeForm from "./NewEpisodeForm/NewEpisodeForm"

const ADMIN_UID = 'IU7cEMs76pScUPdwq7N6lY1dYOp1'
export const isAdmin = (uid) => uid === ADMIN_UID

const Admin = (): JSX.Element | null => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') return null

  return signInCheckResult.signedIn && isAdmin(signInCheckResult.user?.uid) ? (
    <div
      className="w-full max-w-7xl p-4 flex flex-col gap-8 sm:gap-10 lg:gap-12"
    >
      <h1 className="heading">
        Admin
      </h1>
      <h1 className="heading">
        New Episode
      </h1>
      <NewEpisodeForm />
    </div>
  ) : (
    <Redirect to="/" />
  )
}

export default Admin
