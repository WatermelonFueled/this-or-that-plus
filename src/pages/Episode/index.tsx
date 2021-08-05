import { useState } from "react"
import { useParams } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData, useSigninCheck } from "reactfire"
import Loading from "../../components/Loading"
import Logo from "../../components/Logo"
import VideoPlayer from "../../components/VideoPlayer"
import { Login } from "../../Menu/Auth"
import { episodeType, hostResponseType, questionType } from "../../schema"
import { findLast, findLastIndex } from "../../util"
import ChangeEpisode from "./ChangeEpisode"
import QuestionsLoader from "./QuestionsLoader"
import ResponseGrid from "./ResponseGrid"

type questionsMap = { [key: string]: questionType }

const Episode = (): JSX.Element => {
  const { episodeName } = useParams<{ episodeName: string; }>()

  const firestore = useFirestore()
  const { data: [episodeUnknown] } = useFirestoreCollectionData(
    firestore.collection('episodes').where('title', '==', decodeURIComponent(episodeName)),
    { initialData: [], idField: 'id' }
  )
  const episode = episodeUnknown as unknown as episodeType

  const [index, setIndex] = useState(-1)

  const [questions, setQuestions] = useState<questionsMap | null>()
  const currentQuestion = questions?.[episode?.questions?.[index]] ?? null

  const { status, data: signInCheckResult } = useSigninCheck();

  const [stopped, setStopped] = useState(false);

  const [currentHostResponses, setCurrentHostResponses] = useState<hostResponseType[]>([])

  return (
    <div
      className="w-full min-h-screen flex flex-col flex-nowrap 2xl:flex-row"
    >
      {episode && <QuestionsLoader episodeId={episode.id} setQuestions={setQuestions} />}
      <div className="w-full 2xl:w-3/4 ">
        <VideoPlayer
          videoId={episode?.videoId}
          playAutomatically
          onTimeCheck={(current) => {
            if (questions && episode) {
              const qIndex = findLastIndex(
                episode.questions, (qId) => current > questions[qId].time
              )
              if (episode.hosts) {
                setCurrentHostResponses(
                  episode.hosts.reduce((acc, hostName) => {
                    const last = findLast(
                      questions[episode.questions[qIndex]]?.hostResponses ?? [],
                      ({ time, host }) => current > time && host === hostName,
                    )
                    return last !== undefined ? [...acc, last] : acc
                  }, [] as hostResponseType[])
                )
              }
              setIndex(qIndex)
            } else {
              setIndex(-1)
            }
            if (stopped) setStopped(false)
          }}
          onStop={() => setStopped(true)}
        />
      </div>
      <div className="py-4 relative flex flex-col gap-4 flex-grow 2xl:w-1/4">
        {status === 'loading' && <Loading className="absolute m-auto inset-0" />}
        {currentQuestion?.prompt ? (
          <p
            className="mx-4 pl-2 text-xl text-gray-700 dark:text-gray-300 transition opacity-100 border-l-8 border-purple-500"
          >
            {currentQuestion?.prompt}
          </p>
        ) : (
          <>
            <h1 className="heading p-4">
              {episode?.title}
            </h1>
            <Logo
              className="w-16 h-16 self-center"
              duration="4000ms"
              delay={.5}
              repeat={1}
            />
          </>
        )}
        {signInCheckResult?.signedIn ? (
          episode?.id && currentQuestion && !stopped && (
            <ResponseGrid
              episodeId={episode.id}
              question={currentQuestion}
              hostResponses={currentHostResponses}
            />
          )
        ) : (
          <Login />
        )}
        {episode?.id && (
          <ChangeEpisode
            currentId={episode.id}
          />
        )}
      </div>
    </div>
  )
}

export default Episode
