import EpisodeLink from "../../components/EpisodeLink"
import { useEpisodesList } from "../../useDatabase"

const ChangeEpisode = ({ currentId }: { currentId: null | string }) => {
  const episodes = useEpisodesList()

  const currentIndex = episodes?.findIndex(({ id }) => id === currentId) ?? -1

  return currentIndex === -1 ? null : (
    <div className="grid grid-cols-2 mt-auto py-16 px-4 gap-4 w-128 max-w-full self-center">
      {currentIndex > 0 ? (
        <EpisodeLink episode={episodes[currentIndex - 1]}>
          <p className="py-0.5 px-2">
            Next
          </p>
        </EpisodeLink>
      ) : (
        <div />
      )}
      {currentIndex + 1 < episodes.length && (
        <EpisodeLink episode={episodes[currentIndex + 1]}>
          <p className="py-0.5 px-2 text-right">
            Previous
          </p>
        </EpisodeLink>
      )}
    </div>
  )
}

export default ChangeEpisode
