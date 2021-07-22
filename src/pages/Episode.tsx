import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import CONFIG from '../config.json'
import { episodeType, questionType, responseType } from "../schema"
import { findLastIndex } from "../util"
import VideoPlayer from "../components/VideoPlayer"
import ResponseButton from "../components/ResponseButton"
import { useSigninCheck, useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { Login } from "../Menu/Auth"
import Loading from "../components/Loading"
import Logo from "../components/Logo"

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

  return (
    <div
      className="w-full min-h-screen flex flex-col flex-nowrap 2xl:flex-row"
    >
      {episode && <QuestionsLoader episodeId={episode.id} setQuestions={setQuestions} />}
      <div className="w-full 2xl:w-3/4 ">
        <VideoPlayer
          videoId={episode?.videoId}
          playAutomatically
          onTimeCheck={(current) => setIndex(
            questions && episode
            ? findLastIndex(episode.questions, (qId) => current > questions[qId].time)
            : -1
          )}
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
          episode?.id && currentQuestion && (
            <ResponseGrid
              episodeId={episode.id}
              question={currentQuestion}
            />
          )
        ): (
          <Login />
        )}
      </div>
    </div>
  )
}

export default Episode


const QuestionsLoader = ({ episodeId, setQuestions }): null => {
  // TODO try to reduce how much this runs?
  const questionsRef = useFirestore().collection('questions')

  const { data: questionsUnknown } = useFirestoreCollectionData(
    questionsRef.where('episodeId', '==', episodeId),
    { initialData: [], idField: 'id' }
  )

  useEffect(() => {
    if (questionsUnknown) {
      setQuestions(
        (questionsUnknown as unknown as questionType[]).reduce(
          (questionsObj, question) => {
            questionsObj[question.id] = question
            return questionsObj
          },
          {}
        )
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUnknown])

  return null
}


const ResponseGrid = (
  {
    episodeId,
    question,
  }: {
    episodeId: string;
    question: questionType;
  }
): JSX.Element => {
  const { data: user } = useUser()
  const serverIncrement = useFirestore.FieldValue.increment;
  const firestore = useFirestore()
  const responsesRef = firestore.collection('responses')
  const { data: responsesUnknown } = useFirestoreCollectionData(
    responsesRef.where('episodeId', '==', episodeId).where('uid', '==', user.uid),
    { initialData: [], idField: 'id' }
  )
  const responses = responsesUnknown as unknown as responseType[]

  const currentResponse = responses.find(({ questionId }) => questionId === question?.id )

  const questionsRef = firestore.collection('questions')

  const [counts, setCounts] = useState({ total: 0 })
  useEffect(() => {
    questionsRef.doc(question.id).collection('shards').get().then((snapshot) => {
      const aggregated = { total: 0 };
      snapshot.forEach(shard => {
        for (const [option, count] of Object.entries(shard.data())) {
          aggregated[option] = (aggregated?.[option] ?? 0) + count
          aggregated.total += count
        }
      });
      setCounts(aggregated)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id])


  return (
    <div
      className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:auto-cols-fr 2xl:grid-cols-1 gap-4"
    >
      {question && question.options.map(
        ({ text }, option) => (
          <ResponseButton
            key={text}
            checked={option === currentResponse?.option}
            count={counts[option]}
            countTotal={counts.total}
            showCount={!!currentResponse}
            onClick={() => {
              const batch = firestore.batch()

              const shardId = Math.floor(Math.random() * CONFIG.firestoreQuestionsNumShards).toString();
              const shardRef = questionsRef.doc(question.id).collection('shards').doc(shardId)

              if (currentResponse) {
                batch.update(responsesRef.doc(currentResponse.id), {
                  option,
                  date: new Date()
                })
                batch.update(shardRef, {
                  [option.toString()]: serverIncrement(1),
                  [currentResponse.option.toString()]: serverIncrement(-1),
                })
              } else {
                batch.set(responsesRef.doc(), {
                  episodeId,
                  questionId: question.id,
                  uid: user.uid,
                  option,
                  date: new Date()
                })
                batch.update(shardRef, {
                  [option.toString()]: serverIncrement(1),
                })
              }

              batch.commit().then(() => {
                setCounts(prev => (currentResponse ? {
                  ...prev,
                  [option]: prev[option] + 1,
                  [currentResponse.option]: prev[currentResponse.option] - 1,
                } : {
                  ...prev,
                  [option]: prev[option] + 1,
                  total: prev.total + 1,
                }))
              })
            }}
          >
            {text}
          </ResponseButton>
        )
      )}
    </div>
  )
}
