import { PlayIcon } from "@heroicons/react/outline"
import { useQuery } from "react-query"
import { getYoutubeData } from "../api"

const YouTubeThumb = (
  { videoId, title, thumbUrl, ...rest }: 
  { videoId: string; title?: string; thumbUrl?: string }
): JSX.Element | null => {
  const { isError, isLoading, data } = useQuery(
    ['youtubeData', { videoId }],
    () => getYoutubeData(videoId),
    { staleTime: Infinity, enabled: !thumbUrl }
  )

  const thumb = thumbUrl ?? data?.items?.[0]?.snippet?.thumbnails?.high?.url

  return (
    <div className="ratio-9-16-cont rounded-xl overflow-hidden bg-purple-900" {...rest}>
      {!isLoading && !isError && thumb ? (
        <img src={thumb} className="ratio-9-16-item object-cover" alt={title ?? ''} />
      ) : (
        <div className="ratio-9-16-item flex justify-center items-center">
          <PlayIcon className="w-10 h-10 text-purple-300" />
        </div>
      )}
    </div>
  )
}

export default YouTubeThumb
