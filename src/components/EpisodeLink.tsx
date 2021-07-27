import { ReactChild } from "react"
import { Link } from "react-router-dom"
import { episodeType } from "../schema"
import YouTubeThumb from "./YoutubeThumb"

const EpisodeLink = (
  { episode, children }: { episode: episodeType, children?: ReactChild }
) => (
  <Link
    to={{
      pathname: `/${encodeURIComponent(episode.title)}`,
      state: episode
    }}
    className="group block rounded-xl bg-gray-700 dark:bg-gray-300 bg-opacity-20 transition hover:bg-purple-300 focus:bg-purple-300 dark:hover:bg-purple-700 dark:focus:bg-purple-700"
  >
    <YouTubeThumb
      videoId={episode.videoId}
      title={episode.title}
      thumbUrl={episode.thumbHigh}
    />
    {children}
  </Link>
)

export default EpisodeLink
