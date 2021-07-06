import { useEffect, useReducer, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { episodeType, questionType, RESPONSE } from "../schema"
import { findLastIndex } from "../util"
import VideoPlayer from "../components/VideoPlayer"
import ResponseButton from "../components/ResponseButton"

const exampleData = {
  episode: {
    id: 'test',
    videoId: '2EU4ZpIq87s',
    title: 'Test title hello',
    date: new Date(1999, 10, 11, 12, 13),
    questions: ['a', 'b', 'c']
  },
  questions: {
    a: {
      episodeId: 'test',
      time: 11,
      prompt: 'What is your name?',
      options: [
        {text: 'Arthur'},
        {text: 'Lancelot'}
      ]
    },
    b: {
      episodeId: 'test',
      time: 22,
      prompt: 'What is your quest?',
      options: [
        {text: 'Find the Holy Grail'},
        {text: 'Throw the Holy Hand Grenade'},
        {text: 'Bite my thumb at you'}
      ]
    },
    c: {
      episodeId: 'test',
      time: 33,
      prompt: 'What is the air-speed velocity of an unladen swallow?',
      options: [
        {text: 'What?'},
        {text: '10 m/s'}
      ]
    }
  }
}




const Episode = (): JSX.Element => {
  const { episodeName } = useParams<{ episodeName: string; }>()
  const location = useLocation()
  const [episode, setEpisode] = useState<episodeType | null>(location?.state as episodeType ?? null)
  const [questions, setQuestions] = useState<{ [key: string]: questionType } | null>()
  const [index, setIndex] = useState(-1)
  const [responses, dispatch] = useReducer(responseReducer, [])

  useEffect(() => {
    if (episodeName) {
      // load ep
      setIndex(-1)
      setEpisode(exampleData.episode)
      setQuestions(exampleData.questions)
      dispatch({
        type: 'set',
        toSet: new Array(exampleData.episode.questions.length).fill(RESPONSE.BLANK)
      })
    }
  }, [episodeName])

  return (
    <div
      className=""
    >
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
      {index >= 0 && episode && questions && (
        <>
        <p>
          {questions[episode.questions[index]].prompt}
        </p>
        <div
          className="grid grid-cols-2 lg:auto-cols-fr gap-3 p-3"
        >
          {questions[episode.questions[index]].options.map(
            ({ text }, response) => (
              <ResponseButton
                key={text}
                onClick={() => {
                  dispatch({ type: 'respond', response, index })
                }}
                checked={response === responses[index]}
              >
                {text}
              </ResponseButton>
            )
          )}
        </div>
        </>
      )}
    </div>
  )
}

export default Episode


interface respondAction {
  type: 'respond';
  response: RESPONSE;
  index: number;
}
interface clearAction {
  type: 'clear';
}
interface setAction {
  type: 'set';
  toSet: RESPONSE[];
}

const responseReducer = (
  state: RESPONSE[],
  action: respondAction | clearAction | setAction
) => {
  switch (action.type) {
    case 'respond':
      const updated = [...state]
      updated.splice(action.index, 1, action.response)
      return updated
    case 'clear':
      return [...state].fill(RESPONSE.BLANK)
    case 'set':
      return [...action.toSet]
    default:
      throw new Error()
  }
}
