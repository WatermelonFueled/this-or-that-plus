import { useEffect, useState } from "react"
import { Prompt } from "react-router-dom"
import { useFirestore, useUser } from "reactfire"
import FatButton from "../../components/FatButton"
import Loading from "../../components/Loading"


const DeleteAccount = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [text, setText] = useState('')

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { data: user } = useUser();
  const firestore = useFirestore()

  useEffect(() => {
    if (loading) {
      firestore.collection('responses').where('uid', '==', user.uid)
      .get()
      .then((responses) => {
        if (responses.size > 500) {
          throw new Error('Uh-oh, please contact me on twitter @watermelonfuel or email david@watermelonfueled.com for assistance.')
        }

        const batch = firestore.batch()
        responses.forEach((doc) => { batch.delete(doc.ref) })
        batch.commit().then(() => {
          user.delete().catch((fail) => {
            console.error(fail)
            throw new Error('Error while disconnecting account.')
          })
        }, (fail) => {
          console.error(fail)
          throw new Error('Error while deleting responses.')
        })
      }, (fail) => {
        console.error(fail)
        throw new Error('Error while accessing database.')
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setLoading(false)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <div
      id="delete"
      className="grid md:grid-cols-3 m-4 p-4 gap-4 items-center md:justify-items-center border-red-500 border-2 rounded-lg"
    >
      <div className="text-2xl font-bold">
        Danger Zone:
      </div>
      {showConfirm ? (
        <div className="grid gap-4 col-span-2">
          <div className="font-bold italic">
            Account Removal
          </div>
          <div>
            This will remove your account and erase all your responses from the database. To proceed, type "{confirmText}" and click "Confirm".&nbsp;
            <span className="font-bold text-lg">
              THIS CANNOT BE REVERSED.
            </span>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!showConfirm || loading}
              className="input"
            />
            <FatButton
              type="button"
              onClick={() => setLoading(true)}
              disabled={text !== confirmText || loading || !showConfirm}
              className="bg-red-500 disabled:opacity-50"
            >
              {loading ? <Loading className="mx-auto" /> : 'Confirm'}
              <div className="h-0 overflow-hidden opacity-0">Confirm</div>
            </FatButton>
            <FatButton
              type="button"
              onClick={() => setShowConfirm(false)}
              disabled={!showConfirm || loading}
              className="bg-gray-500 disabled:opacity-50"
            >
              Cancel
            </FatButton>
          </div>
          {errorMessage && (
            <div className="p-4 bg-gray-300 text-gray-900 border-red-500 border-l-4">
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-2">
          <FatButton
            type="button"
            onClick={() => setShowConfirm(true)}
            disabled={showConfirm || loading}
            className="bg-red-300 disabled:opacity-50"
          >
            Account Removal
          </FatButton>
        </div>
      )}
      <Prompt
        when={loading}
        message="Account removal is still in progress. Are you sure you want to leave?"
      />
    </div>
  )
}

export default DeleteAccount

const confirmText = 'goodbye'

