import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import YouTubeThumb from "../components/YoutubeThumb"

import { episodeType } from "../schema"

const Episodes = ():JSX.Element => {
  const episodesRef = useFirestore().collection('episodes')
  const episodesCollection = useFirestoreCollectionData(episodesRef, { idField: 'id' })

  let { data, status } = episodesCollection

  useEffect(() => {
    console.debug(episodesCollection)
  }, [status])

  return (
    <div className="p-4 flex flex-col gap-8 sm:gap-10 lg:gap-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300">
        Episodes
      </h1>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.map((episode) => {
          let ep = episode as unknown as episodeType
          return (
            <EpisodeLink key={ep.id} {...ep} />
          )
        })}
      </ol>
    </div>
  )
}

export default Episodes



const EpisodeLink = (props: episodeType) => {

  return (
    <li
      className=""
    >
      <Link
        to={`/${encodeURIComponent(props.title)}`}
        className="group block rounded-xl bg-gray-100 bg-opacity-30 transition hover:bg-purple-500 focus:bg-purple-500 hover:bg-opacity-30 focus:bg-opacity-30"
      >
        <YouTubeThumb videoId={props.videoId} title={props.title} />
        <div
          className="p-3 font-bold text-lg transition group-hover:text-purple-700 dark:group-hover:text-purple-300"
        >
          {props.title}
        </div>
      </Link>
    </li>
  )
}
