import { useEffect, useRef, useState } from "react";
import youTubePlayer from 'youtube-player';

const YT_PLAY_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
}

interface propTypes {
  videoId: string | undefined;
  playAutomatically: boolean | null;
  onTimeCheck: (current: number) => void;
}

const VideoPlayer = (props: propTypes): JSX.Element => {
  const player = useRef()
  const [playState, setPlayState] = useState(YT_PLAY_STATES.UNSTARTED);


  useEffect(() => {
    player.current = youTubePlayer(
      'youtube-iframe',
      {
        playerVars: {
          fs: 0,
          modestbranding: 1,
        }
      }
    )
    // @ts-ignore
    const stateListener = player.current.on('stateChange', (event) => {
      setPlayState(event.data)
    })
    return () => {
      // @ts-ignore
      player.current.off(stateListener)
    }
  }, [])

  useEffect(() => {
    if (props.videoId) {
      // @ts-ignore
      player.current.loadVideoById(props.videoId)
      if (props.playAutomatically) {
        // @ts-ignore
        player.current.playVideo()
      }
    }
  }, [props.videoId, props.playAutomatically])

  useEffect(() => {
    let interval: number | NodeJS.Timeout | null = null
    if (
      playState === YT_PLAY_STATES.PLAYING
      || playState === YT_PLAY_STATES.PAUSED
    ) {
      interval = setInterval(() => {
        // @ts-ignore
        player.current.getCurrentTime()
          .then((current) => props.onTimeCheck(current))
      }, 500)
    }
    return () => {
      if (interval) {
        // @ts-ignore
        clearInterval(interval)
      }
    }
  }, [playState, props])

  return (
    <div className="ratio-9-16-cont xl:h-180 xl:pb-0">
      <div id="youtube-iframe" className="ratio-9-16-item"></div>
    </div>
  );
}

export default VideoPlayer;
