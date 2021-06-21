import { useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer"
import { episodeType, RESPONSE } from "../schema"
import { findLastIndex } from "../util"
import ResponseButton from "../components/ResponseButton"

const exampleData = {
  videoId: '2EU4ZpIq87s',
  questions: [
    {
      time: 11,
      prompt: 'What is your name?',
      options: [
        {text: 'Arthur'},
        {text: 'Lancelot'}
      ]
    },
    {
      time: 22,
      prompt: 'What is your quest?',
      options: [
        {text: 'Find the Holy Grail'},
        {text: 'Throw the Holy Hand Grenade'},
        {text: 'Bite my thumb at you'}
      ]
    },
    {
      time: 33,
      prompt: 'What is the air-speed velocity of an unladen swallow?',
      options: [
        {text: 'What?'},
        {text: '10 m/s'}
      ]
    }
  ]
}

interface propTypes {}

type routeParams = {
  episode: string;
}

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

const EpisodePage = (props: propTypes): JSX.Element => {
  const { episode } = useParams<routeParams>()
  const [data, setData] = useState<episodeType | null>()
  const [index, setIndex] = useState(-1)
  const [responses, dispatch] = useReducer(responseReducer, [])

  useEffect(() => {
    if (episode) {
      // load ep
      setIndex(-1)
      setData(exampleData)
      dispatch({
        type: 'set',
        toSet: new Array(exampleData.questions.length).fill(RESPONSE.BLANK)
      })
    }
  }, [episode])

  return (
    <div
      className=""
    >
      <VideoPlayer
        videoId={data?.videoId}
        onTimeCheck={(current) => setIndex(
          data
          ? findLastIndex(data.questions, ({ time }) => current > time)
          : -1
        )}
      />
      <p>{episode}</p>
      {index >= 0 && data && (
        <>
        <p>
          {data.questions[index].prompt}
        </p>
        <div
          className="grid grid-cols-2 lg:auto-cols-fr gap-3 p-3"
        >
          {data.questions[index].options.map(({ text }, response) => (
            <ResponseButton
              key={text}
              onClick={() => {
                dispatch({ type: 'respond', response, index })
              }}
              checked={response === responses[index]}
            >
              {text}
            </ResponseButton>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default EpisodePage

