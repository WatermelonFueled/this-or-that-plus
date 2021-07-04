import { useQuery } from "react-query"
import CONFIG from '../config.json'

const YouTubeThumb = (
  { videoId, title, ...rest }: { videoId: string; title?: string; }
): JSX.Element | null => {
  const { isError, isLoading, data } = useQuery(
    ['thumbnails', { videoId }],
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

type dataType = {
  items: {
    snippet: {
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }[];
}

const getYoutubeData = async (videoId: string): Promise<dataType> => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${CONFIG.youtubeDataAPIKey}&part=snippet&fields=items(snippet/thumbnails/high)`)
  if (!response.ok) {
    throw new Error('Error while retrieving data');
  }
  return response.json()
}
