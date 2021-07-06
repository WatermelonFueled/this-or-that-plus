import { useQuery } from "react-query"
import { getYoutubeData } from "../api"

const YouTubeThumb = (
  { videoId, title, ...rest }: { videoId: string; title?: string; }
): JSX.Element | null => {
  const { isError, isLoading, data } = useQuery(
    ['youtubeData', { videoId }],
    () => getYoutubeData(videoId),
    { staleTime: Infinity }
  )

  if (isLoading) return null
  if (isError) return null

  const thumb = data?.items?.[0]?.snippet?.thumbnails?.high?.url

  return (
    <div className="ratio-9-16-cont rounded-xl overflow-hidden bg-purple-900" {...rest}>
      {thumb && (
        <img src={thumb} className="ratio-9-16-item object-cover" alt={title ?? ''} />
      )}
    </div>
  )
}

export default YouTubeThumb
