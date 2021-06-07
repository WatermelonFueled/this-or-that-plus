import VideoPlayer from "../components/VideoPlayer"


interface propTypes {
  videoId: string,
}

const EpisodePage = (props: propTypes): JSX.Element => {

  return (
    <div>
      <VideoPlayer />
    </div>
  )
}

export default EpisodePage

