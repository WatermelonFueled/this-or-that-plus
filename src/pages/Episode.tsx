import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { episodeType, questionType, responseType } from "../schema"
import { findLastIndex } from "../util"
import VideoPlayer from "../components/VideoPlayer"
import ResponseButton from "../components/ResponseButton"
import { useSigninCheck, useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { Login } from "../Menu/Auth"


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
    className=""
    >
      {episode && <QuestionsLoader episodeId={episode.id} setQuestions={setQuestions} />}
      <VideoPlayer
        videoId={episode?.videoId}
        playAutomatically
        onTimeCheck={(current) => setIndex(
          questions && episode
          ? findLastIndex(episode.questions, (qId) => current > questions[qId].time)
          : -1
        )}
      />
      <p>
        {episode?.title ?? ''}
      </p>
      <p>
        {currentQuestion?.prompt ?? ''}
      </p>
      {signInCheckResult?.signedIn ? (
        episode?.id && questions && (
          <ResponseGrid
            episodeId={episode.id}
            question={currentQuestion}
          />
        )
      ): (
        <Login />
      )}
    </div>
  )
}

export default Episode


const QuestionsLoader = ({ episodeId, setQuestions }): null => {
  // TODO try to reduce how much this runs?
  const firestore = useFirestore()

  const { data: questionsUnknown } = useFirestoreCollectionData(
    firestore.collection('questions').where('episodeId', '==', episodeId),
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
  }, [questionsUnknown])

  return null
}


const ResponseGrid = (
  {
    episodeId,
    question,
  }: {
    episodeId: string;
    question: questionType | null;
  }
): JSX.Element => {
  const { data: user } = useUser()
  const responsesRef = useFirestore().collection('responses')
  const { data: responsesUnknown } = useFirestoreCollectionData(
    responsesRef.where('episodeId', '==', episodeId).where('uid', '==', user.uid),
    { initialData: [], idField: 'id' }
  )
  const responses = responsesUnknown as unknown as responseType[]

  const currentResponse = responses.find(({ questionId }) => questionId === question?.id )

  return (
    <div
      className="grid grid-cols-2 lg:auto-cols-fr gap-3 p-3"
    >
      {question && question.options.map(
        ({ text }, option) => (
          <ResponseButton
            key={text}
            onClick={() => {
              if (currentResponse) {
                responsesRef.doc(currentResponse.id).update({
                  option,
                  date: new Date()
                })
              } else {
                responsesRef.add({
                  episodeId,
                  questionId: question.id,
                  uid: user.uid,
                  option,
                  date: new Date()
                })
              }
            }}
            checked={option === currentResponse?.option}
          >
            {text}
          </ResponseButton>
        )
      )}
    </div>
  )
}
