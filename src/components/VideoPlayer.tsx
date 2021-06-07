import { useEffect, useRef } from "react";
import youTubePlayer from 'youtube-player';


const VideoPlayer = (): JSX.Element => {
  const player = useRef()

  useEffect(() => {
    player.current = youTubePlayer('youtube-iframe')
    // @ts-ignore
    player.current.loadVideoById('M7lc1UVf-VE')
    // @ts-ignore
    player.current.playVideo()
  }, []);

  return (
    <div>
      <div id="youtube-iframe"></div>
    </div>
  );
}

export default VideoPlayer;
