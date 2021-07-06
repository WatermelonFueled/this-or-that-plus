import { Link } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import YouTubeThumb from "../components/YoutubeThumb"

import { episodeType } from "../schema"

const Episodes = ():JSX.Element => {
  const episodesRef = useFirestore().collection('episodes')
  const { data } = useFirestoreCollectionData(episodesRef, { idField: 'id' })

  return (
    <div className="p-4 flex flex-col gap-8 sm:gap-10 lg:gap-12">
      <h1 className="heading">
        Episodes
      </h1>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.map((episode) => {
          let ep = episode as unknown as episodeType
          return (
            <EpisodeLink key={ep.id} episode={ep} />
          )
        })}
      </ol>
    </div>
  )
}

export default Episodes



const EpisodeLink = ({ episode }: { episode: episodeType }) => (
  <li
    className=""
  >
    <Link
      to={{
        pathname: `/${encodeURIComponent(episode.title)}`,
        state: episode
      }}
      className="group block rounded-xl bg-gray-100 bg-opacity-30 transition hover:bg-purple-500 focus:bg-purple-500 hover:bg-opacity-30 focus:bg-opacity-30"
    >
      <YouTubeThumb videoId={episode.videoId} title={episode.title} />
      <div
        className="p-3 font-bold text-lg transition group-hover:text-purple-700 dark:group-hover:text-purple-300"
      >
        {episode.title}
      </div>
    </Link>
  </li>
)

