import { Link } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData, useSigninCheck } from "reactfire"
import { LogoNoAnim } from "../components/Logo"
import YouTubeThumb from "../components/YoutubeThumb"

import { episodeType } from "../schema"

const Episodes = ():JSX.Element => {
  const episodesRef = useFirestore().collection('episodes').orderBy('date', 'desc')
  const { data: episodes } = useFirestoreCollectionData(episodesRef, { idField: 'id' })

  return (
    <div className="p-resp flex flex-col gap-8 sm:gap-10 lg:gap-12">
      <Welcome />
      <h1 className="heading">
        Episodes
      </h1>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {episodes && episodes.map((episode) => {
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
      className="group block rounded-xl bg-gray-700 dark:bg-gray-300 bg-opacity-20 transition hover:bg-purple-300 focus:bg-purple-300 dark:hover:bg-purple-700 dark:focus:bg-purple-700"
    >
      <YouTubeThumb videoId={episode.videoId} title={episode.title} />
      <div
        className="p-3 font-bold text-lg transition group-hover:text-purple-900 dark:group-hover:text-purple-100"
      >
        {episode.title}
      </div>
    </Link>
  </li>
)


const Welcome = (): JSX.Element | null => {
  const { data: signInCheckResult } = useSigninCheck()

  return signInCheckResult?.signedIn ? null : (
    <div className="pt-4 flex flex-col gap-4 items-center">
      <h1 className="heading text-5xl dark:text-gray-100">
        Welcome to This or That Plus
        <LogoNoAnim
          className="inline w-12 h-12 ml-2 align-top"
        />
      </h1>
      <p className="">
        Simply answer along with the prompts and see how you compare to the community
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Issues? Suggestions? contact me&nbsp;
        <a
          className="text-purple-700 dark:text-purple-300"
          href="https://twitter.com/WatermelonFuel"
          target="_blank"
          rel="noreferrer"
        >
          @WatermelonFuel
        </a>
        &nbsp;or email david@watermelonfueled.com
      </p>
    </div>
  )
}
